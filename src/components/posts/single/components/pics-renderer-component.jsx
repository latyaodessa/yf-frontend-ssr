import React from 'react'

export default class PicsRenderer extends React.Component {
	render() {
		return (
			<div className="pics-content">
				{this.props.largePics.map(pic =><div key={pic} className="img-container"><img className="single-img" src={pic}/></div>)}
			</div>
		)
	}
}
