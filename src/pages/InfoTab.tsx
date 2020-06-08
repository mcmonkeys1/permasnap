import React from 'react';
import { IonContent, IonPage, IonCard, IonCardTitle, IonGrid, IonCardContent, IonCardHeader, IonRow } from '@ionic/react';
import './InfoTab.css';
import * as CSS from 'csstype'

const InfoTab: React.FC = () => {
  return (
    <IonPage>
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
                Welcome to Permasnap.<br />
                <p>
                  This is an early release just for you to test. Permasnap is an application for taking and permanently storing photographs on the Arweave permaweb.
                </p>
                <p>
                  The idea behind this app is to create a smooth onramp for new permaweb users, and promote adoption and use of the permaweb.
                </p>
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
                  When the user uploads a picture the app signs and sends it to the Permasnap DPost (Delegated Posting) server. The server uses the user's wallet to identify them and cryptographically prove that they sent the photo and associated data, and then it is posted to be mined into the blockweave.
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



