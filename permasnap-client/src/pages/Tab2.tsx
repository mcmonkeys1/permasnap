import React from 'react'
import { IonContent, IonPage, IonCard, IonCardTitle, IonCol, IonGrid, IonCardContent, IonCardHeader, IonRow } from '@ionic/react'
import './Tab2.css'
import Header from '../components/Header'

const Tab2: React.FC = () => {
	return (
		<IonPage>
			<Header />
			<IonContent>
				<IonGrid
					class="ion-text-center"
					style={{
						height: '800px',
						backgroundColor: 'white',
						color: '#0f0f0f',
						border: '1px solid green',
						flexDirection: 'column',
						justifyContent: 'space-around',
						display: 'flex'
					}}>
					<IonRow style={{ height: '100px', border: '1px solid red' }}></IonRow>
					<IonRow style={{ height: '100px', border: '1px solid red' }}></IonRow>
					<IonRow style={{ height: '100px', border: '1px solid red' }}></IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Tab2

{
	/* <IonCol className="ion-justify-content-end">
<div>
	<img src={require('../assets/img/branding.svg')} alt="Permasnap logo" width="80%" />
</div>
<IonCard color="tertiary">
	<IonCardHeader className="ion-text-left">IonCardHeader</IonCardHeader>
	<IonCardTitle className="ion-text-right">IonCardTitle</IonCardTitle>
	<IonCardContent>IonCardContent</IonCardContent>
</IonCard>
<div style={{ height: '100%' }}>Hi</div>
</IonCol> */
}
