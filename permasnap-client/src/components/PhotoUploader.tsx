import React, { useState } from 'react'
import { IonContent, IonModal, IonButton, IonText, IonInput } from '@ionic/react'


interface IProps {
	isShowing: boolean	//modal
	hide: ()=>void			//modal
}
const PhotoMetadata = ({isShowing, hide}:IProps) => {
	return (
		<IonModal
			isOpen={isShowing}
			onDidDismiss={ ()=> {if(isShowing){hide()}} }
		>
			<h1>Some modal content!</h1>

			{/* <IonInput value={text} placeholder="Enter text" onIonChange={ev => setText(ev.detail.value!)}></IonInput> */}

			<IonButton onClick={ hide } >Hide IonModal</IonButton>
		</IonModal>
	)
}
export default PhotoMetadata

// const styleModal: CSS.Properties = {
// 		height: "100px",
// 		color: "black",
// }
