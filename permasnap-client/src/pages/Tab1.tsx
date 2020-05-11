import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonRow, IonGrid, IonList, IonListHeader, IonLabel, IonItem, IonIcon } from '@ionic/react';
import './Tab1.css';
import Header from '../components/Header';
import * as CSS from 'csstype'
import { getAllTxsByWallet } from '../providers/ArweaveProvider';
import { useWallet } from '../hooks/useWallet';
import { JWKInterface } from 'arweave/web/lib/wallet';

const Tab1: React.FC = () => {
	const [urls, setUrls] = useState<string[]>([])
	const { arWallet: jwk } = useWallet()
	
	const getUploads = async () => {
    const sArray = await getAllTxsByWallet(jwk as JWKInterface)
    setUrls(sArray)
  }

	useEffect(() => {
		getUploads()
	}, []) //once on componenet load

	return (
		<IonPage>
			<Header />
			<IonContent>
				<IonGrid style={gridStyle} >
					<IonRow style={rowStyle}>
						<img src={require('../assets/img/branding.png')} alt="Permasnap logo" width='100%'/>
					</IonRow>
					<IonList lines="none">
						<IonListHeader>
							<IonLabel>Links to files uploaded with current wallet</IonLabel>
						</IonListHeader>
						{ urls.map(url => (
							<IonItem href={url} key={url} target="_blank">
								<img slot="start" color="medium" src={url} width="10%" />
								<IonLabel>{url}</IonLabel>
							</IonItem>
						))}
					</IonList>	
				



				
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Tab1;


const rowStyle: CSS.Properties = {
  width: '80%',
  // border: '1px solid red'
}
const gridStyle: CSS.Properties = {
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center'
}
const cardStyle: CSS.Properties = {
  width: '100%',
  borderRadius: '20',
  margin: '0',
  padding: '10',
  textAlign: 'center'
}
