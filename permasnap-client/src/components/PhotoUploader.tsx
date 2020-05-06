import React, { useState } from 'react'
import { IonContent, IonModal, IonButton } from '@ionic/react'
import { CameraPhoto } from '@capacitor/core'
import { IClientDelegatedTxnDto } from "../types/dpost";
import CSS from 'csstype';

interface IProps {
	isShowing: boolean
	hide: ()=>void
}
const PhotoMetadata = ({isShowing, hide}:IProps) => {
	return (
		<>
			<IonModal
				isOpen={isShowing}
				onDidDismiss={ ()=> {if(isShowing){hide()}} }
			>
				<IonButton onClick={ hide } >Hide IonModal</IonButton>
				<h1>Some modal content!</h1>
			</IonModal>
		</>
	)
}
export default PhotoMetadata

const styleModal: CSS.Properties = {
		height: "100px",
		color: "black",
}
