import React, { useState, useEffect } from 'react'
import { IonContent, IonModal, IonButton, IonText, IonInput, IonLabel, IonCheckbox, IonItem, IonTextarea, IonCard } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { IStoreState } from '../redux/reducers'
import { setCurrentPhoto } from '../redux/actions'
import * as CSS from 'csstype';
import { IDpostResult, DPost } from '../providers/DPostProvider'
import { JWKInterface } from 'arweave/web/lib/wallet'
import { useWallet } from '../hooks/useWallet'
import { Plugins } from '@capacitor/core';


interface IProps {
	isShowing: boolean	//modal
	hide: ()=>void			//modal
}
const PhotoMetadata = ({isShowing, hide}:IProps) => {
	const { Toast } = Plugins;
	const currentPhoto = useSelector((state: IStoreState) => state.currentPhoto) //redux
	const dispatch = useDispatch() //redux
	const [description, setDescription] = useState('')
	const [tags, setTags] = useState<string[]>([])
	const [checkedExif, setCheckedExif] = useState(true)
	const { arWallet: jwk }  = useWallet()
	let exifData: any = currentPhoto.exif

	useEffect(() => {
			// Quick data length check - this can be removed once arweave 2.1 is released ?
		const MAX_SIZE = 10*1024*1024 // 10MB as of arweavejs v1.7
		let size = (new TextEncoder().encode(currentPhoto.dataUri)).length
		console.log('DataUri image size: '+ size)
		if(size > MAX_SIZE){
			console.error("file too big: "+size)
			alert("file too big:"+size+' bytes\nthis can be removed once arweave 2.1 is released')
			return 
		}

	}, [currentPhoto])

	/**
	 * Consider extracting this to separate module. Many TODOs
	 */
	const upload = () => {
		currentPhoto.description = description
		currentPhoto.tags = tags
		if(!checkedExif){
			currentPhoto.exif = undefined
		}

		/** We're not actually doing anythihg with the exif data until a later version, as it's undefined in dpost server.
		 * We could try and calculate longitude & latitude if GPS data given, but this is non-standard exif format, and 
		 * might be easier to do with geo-location API.
		 */

		//send using dpost server
		
		DPost(
			jwk as JWKInterface,
			currentPhoto.dataUri,
			currentPhoto.tags,
			currentPhoto.description,
		).then(res => {
			console.log("DPostResult: "+ JSON.stringify(res))
			//TODO: add txid to internal list
			Toast.show({text: "Photo uploading ("+res.status+"). TxId: "+ res.id, position: "center"})
			hide()
		}).catch((err: any) => {
			let sErr: string = 'Error in PhotoUploader: '+ JSON.stringify(err)
			console.log(sErr)
			Toast.show({text: sErr})
		})
	}

	return (
		<IonModal
			isOpen={isShowing}
			onDidDismiss={ ()=> {if(isShowing){hide()}} }
		>
			<IonCard style={cardStyle} >
				<h1>Ready for Permanent Upload?</h1>
				<img src={currentPhoto.dataUri} width='50%' />

				<IonInput value={description} placeholder="Enter caption..." onIonChange={ev => setDescription(ev.detail.value!)}></IonInput>

				<IonInput value={tags.join(' ')} placeholder="Enter space for multiple tags..." onIonChange={ev => setTags( (ev.detail.value!).split(' ') )}></IonInput>
				<IonText color="secondary">{'#'+ tags.join(' #')}</IonText>
				<br />
				<IonButton onClick={ upload } >Upload Permanently</IonButton>

				<IonItem >
					<IonCheckbox checked={checkedExif && exifData} disabled={!exifData} onIonChange={e => setCheckedExif(e.detail.checked)} />
					<IonText>&nbsp;Use EXIF data</IonText>
				</IonItem>
				<IonTextarea color={checkedExif?"tertiary":"grey"} disabled={true}  style={exifDataStyle}>
					{ !exifData ? "no EXIF data" : Object.keys(exifData ).map(key =>
						<li><span style={{float:"left"}}>{key}</span><span style={{float:"right"}}>{exifData[key]}</span></li>
					)}
				</IonTextarea>

			</IonCard>
		</IonModal>
	)
}
export default PhotoMetadata

const cardStyle: CSS.Properties = {
	textAlign: "center",
	overflow: "scroll",
}

const exifDataStyle: CSS.Properties = {
	textAlign: 'left',
}
