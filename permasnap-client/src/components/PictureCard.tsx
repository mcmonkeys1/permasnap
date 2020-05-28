import React, { useState, useEffect } from 'react'
import { IonCol, IonCard, IonGrid, IonText, IonSpinner } from '@ionic/react'
import { IPsnapPhoto } from '../redux/reducers'
import Hashtag from './Hashtag'
import { getArweaveId } from '../providers/ArweaveProvider'

const PictureCard = ({data}:{data:IPsnapPhoto}) => {
	const [arweaveId, setArweaveId] = useState({ name: 'Loading...', address: ''})

	useEffect(() => {
		const init = async () => {
			let arid = await getArweaveId(data.owner!)
			console.log('Found arweave-id name: ' + arid.name)
			setArweaveId(arid)
		}
		if(data.owner){
			init()
		}
	}, [data])

	return (
		<IonCol sizeXs="12" sizeSm="6" sizeMd="4" sizeLg="3" >
		<IonCard color="primary">
			<IonGrid style={{display: 'flex'}}>
				<IonCol>
					<a href={data.url} key={data.url} target="_blank">
						<img slot="start" color="medium" src={data.url ? data.url : data.dataUri} width="100%" />
					</a>
				</IonCol>
				<IonCol>
					{ !data.completed && (<><IonSpinner color='tertiary' name="crescent" />&nbsp;Mining...<br /><br /></>) }
					<IonText>{arweaveId.name}</IonText><br />

					<IonText color="secondary">{data.description}</IonText><br /><br />
					
					{ data.hashtags.length>0 ? data.hashtags.map(tag=> <Hashtag key={data.id+tag} term={tag} />) : ""}					
				</IonCol>
			</IonGrid>
		</IonCard>
	</IonCol>
	)
}

export default PictureCard



