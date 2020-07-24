import React, { useState, useEffect } from 'react'
import { IonModal, IonButton, IonText, IonInput, IonCard, IonIcon } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { IStoreState } from '../redux/reducers'
import { addTxItem, setCurrentPhoto } from '../redux/actions';
import * as CSS from 'csstype';
import { DPost } from '../providers/DPostProvider'
import { JWKInterface } from 'arweave/web/lib/wallet'
import { useWallet } from '../hooks/useWallet'
import { Plugins } from '@capacitor/core';
import { send } from 'ionicons/icons'
import { getTxStatus } from '../providers/ArweaveProvider';



interface IProps {
	isShowing: boolean	//modal
	hide: ()=>void			//modal
}
const PhotoMetadata = ({isShowing, hide}:IProps) => {
	const { Toast } = Plugins;
	const currentPhoto = useSelector((state: IStoreState) => state.currentPhoto) //redux
	const dispatch = useDispatch()
	const [description, setDescription] = useState('')
	const [tags, setTags] = useState<string[]>([])
	const { arWallet: jwk }  = useWallet()
	const [uploading, setUploading] = useState(false)

	useEffect(() => {
		// Quick data length check - this can be removed once arweave 2.1 is released ?
		const MAX_SIZE = 10*1024*1024 // 10MB as of arweavejs v1.7
		let size = (new TextEncoder().encode(currentPhoto.dataUri)).length
		console.log('DataUri image size: '+ size)
		if(size > MAX_SIZE){
			console.error("file too big: "+size)
			alert("Error. File too big: "+size+' bytes\nthis can be removed once arweave 2.1 is released')
			return
		}

	}, [currentPhoto])

	/**
	 * Consider extracting this to separate module. Many TODOs
	 */
	const upload = () => {
		setUploading(true)
		Toast.show({text: 'Photo uploading...', position: 'center'})
		currentPhoto.description = description
		currentPhoto.hashtags = tags

		//send using dpost server

		DPost(
			jwk as JWKInterface,
			currentPhoto.dataUri!,
			currentPhoto.hashtags,
			currentPhoto.description,
		).then(async res => {
			console.log('DPost: ' + res.id)
			Toast.show({text: 'Done. Photo will take 5-20 minutes to mine...', position: 'center'})

			let status = await getTxStatus(res.id)
			// save in upload queue
			dispatch(addTxItem({
				id: res.id,
				status: status.status + '',
				dataUri: currentPhoto.dataUri,
				completed: false,
				hashtags: currentPhoto.hashtags,
				description: currentPhoto.description
			}))
			
			//clean up memory
			dispatch(setCurrentPhoto({
				completed: false,
				hashtags: [],
			}))

			hide()

		}).catch((err: any) => {
			let sErr: string = 'Error in PhotoUploader: '+ JSON.stringify(err)
			console.log(sErr)
			Toast.show({text: 'NETWORK ERROR! Please try again', position: 'center'})
		}).finally( () =>
			setUploading(false)
		)
	}

	return (
		<IonModal
			isOpen={isShowing}
			onDidDismiss={ ()=> {if(isShowing){hide()}} }
		>
			<IonCard
					style={{...cardStyle, backgroundImage: `url('${currentPhoto.dataUri}')`}}
				>

				<div style={containerStyle}>

					<div style={hashtagsStyle}>
						<IonInput value={tags.join(' ')} placeholder="Enter space for multiple tags..." onIonChange={ev => setTags( (ev.detail.value!).split(' ') )} />
						<IonText color="dark">{'#'+ tags.join(' #')}</IonText>
					</div>
					<br />

					<div style={captionStyle}>
						<IonInput style={captionInputStyle} value={description} placeholder="Enter caption..." onIonChange={ev => setDescription(ev.detail.value!)} />
						<IonButton disabled={uploading} color="none" onClick={ upload } style={{float: 'right'}} ><IonIcon slot="icon-only" icon={send} /></IonButton>
					</div>
				</div>

			</IonCard>
		</IonModal>
	)
}
export default PhotoMetadata



const cardStyle: CSS.Properties = {
	margin: '0px',
	padding: '0px',
	width: '100%',
	height: '100%',
	overflow: 'hidden',
	backgroundPosition: 'center center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
}

const containerStyle: CSS.Properties = {
	position: 'absolute',
	width: '100%',
	bottom: '0px',
	left: '0px',
	padding: '0px',
	margin: '0px',
}
const hashtagsStyle: CSS.Properties = {
	position: 'relative',
	top: '-50px',
	padding: '10px',
	margin: '5px',
	backgroundColor: 'rgba(128, 128, 128, 0.5)',
	color: 'white',
	borderRadius: '10px',
}
const captionStyle: CSS.Properties = {
	position: 'absolute',
	display: 'flex',
	flexDirection: 'row',
	bottom: '0px',
	padding: '10px',
	width: '100%',
	marginBottom: '0px',
	backgroundColor: 'rgba(128, 128, 128, 0.5)',
	color: 'white',
}
const captionInputStyle: CSS.Properties = {
	// borderBottom: '1px solid white',
}