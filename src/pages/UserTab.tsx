import React from 'react';
import { IonContent, IonPage, IonRow, IonGrid, IonLabel } from '@ionic/react';
import './UserTab.css';
import * as CSS from 'csstype'
import { useWallet } from '../hooks/useWallet';
import { JWKInterface } from 'arweave/web/lib/wallet';
import { useTxNotifier } from '../hooks/useTxNotifier';
import PictureCard from '../components/PictureCard';

const UserTab: React.FC = () => {
	const { arWallet } = useWallet()
	const { txDatas } = useTxNotifier(arWallet as JWKInterface)

	return (
		<IonPage>
			<IonContent>
				<IonGrid id="screenGrid" style={screenGridStyle} >
					<IonRow style={brandingRowStyle}>
						<img src={require('../assets/img/branding.png')} alt="Permasnap logo" width='100%'/>
					</IonRow>
					<IonRow>
							{ (txDatas.length > 0) ? txDatas.map(data => (
								<PictureCard key={data.id} data={data} />
							)) : <IonLabel>Get started by taking some pictures!</IonLabel>}
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default UserTab;


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
