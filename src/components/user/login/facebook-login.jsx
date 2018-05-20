import React from 'react';
import {connect} from 'react-redux';
import {getUserByID, createFBUser} from '../../../actions/user/user-actions';
import {login} from '../../../actions/core/login-logout-actions';
import FBWhite from '../../../res/img/social/white/fb.png';


@connect((store) => {
	return {
		user: store.user,
		fb_user: store.facebook
	}
})
export default class FaceBookLoginButton extends React.Component {

	constructor(props) {
		super(props);
		this.me = this.me.bind(this);
		this.login = this.login.bind(this);
	}

	state = {
		user_auth: "",
		user_type: ""
	};

	componentDidMount() {
		window.fbAsyncInit = function () {
			FB.init({
				appId: '195832684171840',
				cookie: true,
				xfbml: true,
				version: 'v2.8'
			});
			FB.AppEvents.logPageView();
		};

		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}

	componentWillReceiveProps(nextProps) {
		if (!this.isRegisteredUserFetchedAndExist(nextProps) && !this.isFBUserFetched(nextProps) && this.state.user_type == 'fb') {
			this.props.dispatch(createFBUser(this.state.user_auth));
		}
	}

	isRegisteredUserFetchedAndExist(nextProps) {
		return nextProps.user.user && nextProps.user.fetched;
	}

	isFBUserFetched(nextProps) {
		return nextProps.fb_user.user && nextProps.fb_user.fetched;
	}
	loginToYF() {
		this.props.dispatch(login());
	}

	me() {
		let FB_REQUESTED_FIELDS = ['id', 'first_name', 'last_name', 'gender', 'birthday',
			'email', 'hometown', 'languages', 'locale', 'location',
			'website', 'picture.height(200).width(200)'];

		FB.api('/me?fields=' + FB_REQUESTED_FIELDS.join(','), function (res) {
			this.setState({user_auth: res, user_type: "fb"});
			this.getUserById(res.id);
			this.loginToYF();
		}.bind(this));
	}

	login() {
		FB.login(function (response) {
			this.me();
		}.bind(this));
	}

	getUserById(userId) {
		this.props.dispatch(getUserByID(userId));
	}

	render() {
		return (
			<div>
				<a className="button fb" onClick={this.login} role="button">
					<span>Войти через FB</span>
					<div className="icon">
						<img src={FBWhite}/>
					</div>
				</a>
			</div>
		)
	}
}
