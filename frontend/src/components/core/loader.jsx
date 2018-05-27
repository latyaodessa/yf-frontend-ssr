import React from 'react'

export default class Loader extends React.Component {
	render() {
		return (
			<div id="waiting-loader">
				<div className="circle-multiple">
					<div className="circle"></div>
					<div className="circle"></div>
					<div className="circle"></div>
				</div>
			</div>
		);
	}
};
