import React from 'react';
import {Link} from 'react-router-dom';

export default class ConfirmationPopUp extends React.Component {

	render() {
		return (
			<div className="popup">
				<p>{this.props.popUpData.text}</p>
				<ul>
					<li>
						<a className="button-popup" onClick={this.props.popupHandler}>
							{this.props.popUpData.leftButton}
						</a>
					</li>
					<li>
						<Link className="button-popup" to={this.props.popUpData.rightButtonNavigator}>{this.props.popUpData.rightButton}</Link>
					</li>
				</ul>
			</div>
		)
	}
}
