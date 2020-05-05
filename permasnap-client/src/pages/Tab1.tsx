import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useWallet } from '../hooks/useWallet';
import { DPost } from '../providers/DPostProvider';
import { JWKInterface } from 'arweave/web/lib/wallet';
import image from '../assets/test/image-test-2mb-jpeg'

const Tab1: React.FC = () => {
  const { arWallet, arAddress } = useWallet()
  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        <hr />
        <IonButton onClick={() => {
                  console.log('Tab1 DPOST ARGUMENTS:...')
                  console.log(JSON.stringify(arWallet))
                  console.log(JSON.stringify(image))
          DPost(arWallet as JWKInterface, image, []).then( res => console.log(res))
        }}>
          Test DPost
        </IonButton>
        Wallet Address: {arAddress} 
        <hr />
        Actual Wallet: { JSON.stringify(arWallet)}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
