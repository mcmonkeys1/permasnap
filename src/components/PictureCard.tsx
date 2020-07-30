import React, { useState, useEffect } from 'react'
import { IonCol, IonCard, IonText, IonSpinner } from '@ionic/react'
import { IPsnapPhoto } from '../redux/reducers'
import Hashtag from './Hashtag'
import { getArweaveId, IArIdData } from '../providers/ArweaveProvider'
import { Link } from 'react-router-dom'
import * as CSS from 'csstype'

const PictureCard = ({data}:{data:IPsnapPhoto}) => {
	const [arweaveId, setArweaveId] = useState<IArIdData>()

	useEffect(() => {
		const init = async () => {
			let arid = await getArweaveId(data.owner!)
			console.log('Found arweave-id name: ' + arid.name)
			setArweaveId(arid)
		}
		if(data.owner){
			init()
		}
	}, [data])

	return (
		<IonCol sizeXs="12" sizeSm="6" sizeMd="4" sizeLg="3" >
		<IonCard style={cardStyle} >
			<a href={data.url} key={data.url} target="_blank">
				<img slot="start" src={data.url ? data.url : data.dataUri} style={{marginBottom: '-5px'}} />
			</a>
			{ !data.completed && (<><IonSpinner  name="crescent" style={spinnerStyle} /></>) }
			{ arweaveId && (<>
				<Link to={`/searchtab/search?pubkey=${data.owner}`}>
					<span  style={nameStyle} >{arweaveId.name}</span>
				</Link>
			</>)}

			<div style={containerStyle}>

				{ data.hashtags.length>0 && data.hashtags.map(tag=> 
					<Hashtag key={data.id+tag} term={tag} style={hashtagsStyle} />
				)}					
				<br />
				{ data.description && (<>
					<IonText style={captionStyle} >{data.description}</IonText><br /><br />
				</>)}
				
			</div>

		</IonCard>
	</IonCol>
	)
}

export default PictureCard

const cardStyle: CSS.Properties = {
	margin: '0px',
	padding: '0px',
}
const spinnerStyle: CSS.Properties = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  color: 'medium',
}
const nameStyle: CSS.Properties = {
  position: 'absolute',
  top: '10px',
  left: '10px',
	padding: '10px',
  backgroundColor: 'rgba(128, 128, 128, 0.5)',
	color: 'white',
	borderRadius: '10px', 
}

const containerStyle: CSS.Properties = {
	position: 'absolute',
	width: '100%',
	bottom: '0px',
	left: '0px',
	padding: '0px',
	margin: '0px',
}
const hashtagsStyle: CSS.Properties = {
	position: 'relative',
	top: '-15px',
	padding: '10px',
	margin: '2px',
	backgroundColor: 'rgba(128, 128, 128, 0.5)',
	color: 'white',
	borderRadius: '10px', 
}
const captionStyle: CSS.Properties = {
	position: 'absolute',
	bottom: '0px',
	padding: '10px',
	width: '100%',	
	marginBottom: '0px',
	backgroundColor: 'rgba(128, 128, 128, 0.5)',
	color: 'white',
}

