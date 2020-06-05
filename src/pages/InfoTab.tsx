import React from 'react';
import { IonContent, IonPage, IonCard, IonCardTitle, IonGrid, IonCardContent, IonCardHeader, IonRow, IonCardSubtitle, IonIcon, IonLabel } from '@ionic/react';
import './InfoTab.css';
import Header from '../components/Header'
import imgChevron from '../assets/img/chevron.svg'
import * as CSS from 'csstype'

const InfoTab: React.FC = () => {
  return (
    <IonPage>
			<Header />
			<IonContent>
				<IonGrid style={gridStyle} >
					<IonRow style={rowStyle}>
            <img src={require('../assets/img/branding.png')} alt="Permasnap logo" width='100%'/>
          </IonRow>
					<IonRow style={{ ...rowStyle}}>
            <IonCard color='tertiary' style={cardStyle}>
              <IonCardHeader>
                <IonCardTitle>Hello ARCA / Arweave Member</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
              Welcome to Permasnap.<br /> This is an early release just for you to test. Permasnap is an application for taking and permanently storing photographs on the Arweave permaweb.
              </IonCardContent>
            </IonCard>
          </IonRow>
					<IonRow style={rowStyle}>
            <IonCard color='primary' style={cardStyle} button={true} >
              {/* <IonIcon src={imgChevron}  /><IonLabel>Settings</IonLabel><IonIcon src={imgChevron}  /> */}
              <IonCardTitle>For Testing Audience</IonCardTitle>
              <IonCardContent>
                <p>
                  After installation a wallet is automatically created for the user and stored in the device's secure key store. The wallet holds no initial balance, and is used for identification at this point in time.
                </p>
                <p>
                  When the user uploads a picture they sign and send it to the Permasnap DPost (Delegated Posting) server. It uses the user's wallet to identify them and cryptographically prove that they sent the photo and associated data, and then actually post it to be mined in the blockweave.
                </p>
              </IonCardContent>
            </IonCard>
          </IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
  );
};

export default InfoTab;


const gridStyle: CSS.Properties = {
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
}
const rowStyle: CSS.Properties = {
  width: '80%',
  // border: '1px solid red'
}
const cardStyle: CSS.Properties = {
  width: '100%',
  borderRadius: '20',
  margin: '0',
  padding: '10',
  textAlign: 'center'
}



