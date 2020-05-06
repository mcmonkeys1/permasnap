import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { usePhotoUploader } from '../hooks/usePhotoUploader';
import PhotoUploader from '../components/PhotoUploader';

const Tab1: React.FC = () => {
  const { isShowing: isShowingModal, toggle: toggleModal } = usePhotoUploader()
  
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


        <IonButton onClick={ ()=> toggleModal() }>Show modal</IonButton>

        <PhotoUploader isShowing={isShowingModal} hide={toggleModal} />

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
