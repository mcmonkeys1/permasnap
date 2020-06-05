import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
	term: string
	style: React.CSSProperties
}

const Hashtag = ({term,style}:IProps) => {
	return (
		<Link  to={`/searchtab/search?hashtag=${term}`} >
			<span style={style}>
				{'#'+term}
			</span>
		</Link>
	)
}

export default Hashtag

