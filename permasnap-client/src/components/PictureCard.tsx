import React from 'react'
import { IonCol, IonCard, IonGrid, IonText, IonSpinner } from '@ionic/react'
import { IPsnapPhoto } from '../redux/reducers'

const PictureCard = ({data}:{data:IPsnapPhoto}) => {
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
					{ !data.completed && (<><IonSpinner color='tertiary' name="crescent" />&nbsp;Loading...<br /><br /></>) }
					<IonText color="secondary">{data.description}</IonText><br /><br />
					<IonText color="tertiary">{ data.hashtags.length>0 ? '#'+ data.hashtags.join(' #') : ''}</IonText>
				</IonCol>
			</IonGrid>
		</IonCard>
	</IonCol>
	)
}

export default PictureCard
