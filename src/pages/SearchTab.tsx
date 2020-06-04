import React, { useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonText, IonLabel, IonHeader, IonTitle } from '@ionic/react';
import * as CSS from 'csstype'
import './SearchTab.css';
import Header from '../components/Header';
import PictureCard from '../components/PictureCard';
import { useSearch } from '../hooks/useSearch';



const SearchTab: React.FC = ({match}:any) => {
  const [txtInput, setTxtInput] = useState('')
  var {txData, text: queryString} = useSearch({match})


{/* <IonInput value={txtInput} placeholder="Enter text" onIonChange={ev => setTxtInput(ev.detail.value!)}></IonInput> */}

  return (
		<IonPage>
			<Header />
			<IonContent>
				<IonGrid id="screenGrid" style={screenGridStyle} >
          <IonRow><IonTitle>{queryString}</IonTitle></IonRow>
					<IonRow style={brandingRowStyle}>
						<img src={require('../assets/img/branding.png')} alt="Permasnap logo" width='100%'/>
					</IonRow>
					<IonRow>
							{ (txData.length > 0) ? txData.map(data => (
								<PictureCard key={data.id} data={data} />
							)) : <IonLabel>No pictures found.</IonLabel>}
					</IonRow>	
				</IonGrid>
			</IonContent>
		</IonPage>
  );
};

export default SearchTab;

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