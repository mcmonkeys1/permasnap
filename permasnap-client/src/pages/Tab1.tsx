import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonRow, IonGrid, IonLabel, IonText, IonCol, IonCard } from '@ionic/react';
import './Tab1.css';
import Header from '../components/Header';
import * as CSS from 'csstype'
import { getAllTxsByWallet, ITxData } from '../providers/ArweaveProvider';
import { useWallet } from '../hooks/useWallet';
import { JWKInterface } from 'arweave/web/lib/wallet';

const Tab1: React.FC = () => {
	const [txDatas, setTxDatas] = useState<ITxData[]>([])
	const { arWallet: jwk } = useWallet()
	let timerId: NodeJS.Timeout //ref of setInterval
	
	const getUploads = async () => {
    const _txDatas = await getAllTxsByWallet(jwk as JWKInterface)
		setTxDatas(_txDatas)
		console.log('fetched data @'+ (new Date()))
  }

	useEffect(() => {
		getUploads()
		timerId = setInterval(getUploads,60000) //check every minute
		return () =>{
			clearInterval(timerId)
		}
	}, []) //once on componenet load

	return (
		<IonPage>
			<Header />
			<IonContent>
				<IonGrid id="screenGrid" style={screenGridStyle} >
					<IonRow style={brandingRowStyle}>
						<img src={require('../assets/img/branding.png')} alt="Permasnap logo" width='100%'/>
					</IonRow>
					<IonRow>
							{ (txDatas.length > 0) ? txDatas.map(data => (
								<IonCol sizeXs="12" sizeSm="6" sizeMd="4" sizeLg="3" style={thumbStyle} >
									<IonCard color="primary">
										<IonGrid style={{display: 'flex'}}>
											<IonCol>
												<a href={data.url} key={data.url} target="_blank">
													<img slot="start" color="medium" src={data.url} width="100%" />
												</a>
											</IonCol>
											<IonCol>
												<IonText color="secondary">{data.description}</IonText><br /><br />
												<IonText color="tertiary">{ data.hashtags.length>0 ? '#'+ data.hashtags.join(' #') : ''}</IonText>
											</IonCol>
										</IonGrid>
									</IonCard>
								</IonCol>
							)) : <IonLabel>No uploaded files found with current wallet</IonLabel>}
					</IonRow>	
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Tab1;


const screenGridStyle: CSS.Properties = {
	height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
	alignItems: 'center',
	overflow: 'scroll',
	scrollbarWidth: 'none', //Firefox: invisible scrollbars
	WebkitOverflowScrolling: 'touch',
}
const brandingRowStyle: CSS.Properties = {
	width: '80%',
	// border: '1px solid red'
}
const thumbStyle: CSS.Properties = {
	// width: "50%",
}
