import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonFab, IonFabButton, isPlatform } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Plugins } from "@capacitor/core";
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import { useWallet } from './hooks/useWallet';
import { useTakePhoto } from './hooks/useTakePhoto';
import { isInstanceofJwkInterface } from './providers/ArweaveProvider';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';

/* Hitting backButton on Android exits */
if(process.env.NODE_ENV !== 'test' && isPlatform('android')){
    Plugins.App.addListener('backButton',() => Plugins.App.exitApp() )
}

const App: React.FC = () => {
  const { takePhoto } = useTakePhoto()
  const { arWallet } = useWallet()
  useEffect(() => {
    Plugins.SplashScreen.hide()

    //app constants
    console.log('process.env.NODE_ENV='+process.env.NODE_ENV)
    console.log('App-Name: '+process.env.REACT_APP_APP_NAME)
    console.log('App-Version: '+process.env.REACT_APP_APP_VERSION)

    //call useWallet to initialise
    if(isInstanceofJwkInterface(arWallet)){
      console.log("Wallet loaded")
    } else{
      console.log("ERROR! Failed to load a wallet")
    }
  },[]) //like c'tor

  return (
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet >
            <Route path="/tab1" component={Tab1} exact={true} />
            <Route path="/tab2" component={Tab2} exact={true} />
            <Route path="/tab3" component={Tab3} exact={true} />
            <Route path="/" render={() => <Redirect to="/tab2" />} exact={true} />
          </IonRouterOutlet>
          <IonFab vertical='bottom' horizontal='start' class='ion-padding-bottom ion-margin-bottom ion-padding-start ion-margin-start'>
            <IonFabButton color="secondary" routerLink='/tab1' routerDirection='none'>
              <img src={require('./assets/img/icon-images.svg')} alt="images" />
            </IonFabButton>
          </IonFab>
          <IonFab vertical='bottom' horizontal='center' class='ion-padding-bottom ion-margin-bottom'>
            <IonFabButton color='primary' routerLink='/tab2' routerDirection='none' onClick={() => takePhoto().then((p)=>console.log(p))}>
              <img src={require('./assets/img/icon-camera-200.png')} alt="camera" />
            </IonFabButton>
          </IonFab>
          <IonFab vertical='bottom' horizontal='end' class='ion-padding-bottom ion-margin-bottom ion-padding-end ion-margin-end'>
            <IonFabButton color='tertiary' routerLink='/tab3' routerDirection='none'>
              <img src={require('./assets/img/icon-eye.svg')} alt="gallery" />
            </IonFabButton>
          </IonFab>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;

