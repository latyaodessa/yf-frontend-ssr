import React from 'react';

export default class HeaderUserDashboard extends React.Component {


	getUserThumbnail() {
		return localStorage.getItem('user_thumbnail');
	}

	getUserName() {
		return [localStorage.getItem('user_first_name'), localStorage.getItem('user_last_name')].join(" ");
	}

	render() {
		return (
			<div className="dashboard-header">
				<div className="pure-g">
					<div className="pure-u-1 pure-u-md-1-1">
						<div className="inner-container">
							<img className='avatar' src={this.getUserThumbnail()}/>
								<h1 className="no-underscore">{this.getUserName()}</h1>
						</div>
					</div>
					{/*<div className="pure-u-1 pure-u-md-1-2">*/}
						{/*<div className="inner-container">*/}
							{/*bbb*/}
						{/*</div>*/}
					{/*</div>*/}
				</div>
			</div>
		)
	}
}
