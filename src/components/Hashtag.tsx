import React from 'react'
import { Link } from 'react-router-dom'
import { IonText } from '@ionic/react'
import * as CSS from 'csstype';

interface IProps {
	term: string
}

const Hashtag = ({term}:IProps) => {
	return (
		<div>
			<Link  to={`/searchtab/search?hashtag=${term}`} ><IonText color='tertiary' >{'#'+term}</IonText></Link>
		</div>
	)
}

export default Hashtag

// const linkStyle: CSS.Properties = {
// 	color: 'tertiary',
// 	textDecoration: 'none !important',
// }