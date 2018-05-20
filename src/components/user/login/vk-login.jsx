import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import VKWhite from '../../../res/img/social/white/vk.png';
import {getUserByID, createVkUser} from '../../../actions/user/user-actions';

@connect((store) => {
	return {
		user: store.user,
		vk_user: store.vk,
		loginLogout: store.loginLogout
	}
})
export default class VKLoginButton extends React.Component {

	constructor(props) {
		super();
		this.clickVk = this.clickVk.bind(this);
		this.getVkUserById = this.getVkUserById.bind(this);
		this.createVkUser = this.createVkUser.bind(this);

	}

	state = {
		isSdkLoaded: false,
		isProcessing: false,
		vk_user_auth: "",
		user_type: ""
	};

	componentDidMount() {
		if (document.getElementById('vk-jssdk')) {
			this.sdkLoaded();
			return;
		}
		this.setFbAsyncInit();
		this.loadSdkAsynchronously();
	}

	componentWillReceiveProps(nextProps) {
		if (!this.isRegisteredUserFetchedAndExist(nextProps) && !this.isVkUserFetched(nextProps) && this.state.user_type == 'vk') {
			this.createVkUser(this.state.vk_user_auth.id);
		}
	}

	isRegisteredUserFetchedAndExist(nextProps) {
		return nextProps.user.user && nextProps.user.fetched;
	}

	isVkUserFetched(nextProps) {
		return nextProps.vk_user.user && nextProps.vk_user.fetched;
	}

	setFbAsyncInit() {
		window.vkAsyncInit = function () {
			VK.init({
				apiId: 4601875
			});
		};
	}

	sdkLoaded() {
		this.setState({isSdkLoaded: true});
	}

	loadSdkAsynchronously() {
		const el = document.createElement('script');
		el.type = 'text/javascript';
		el.src = 'https://vk.com/js/api/openapi.js?139';
		el.async = true;
		el.id = 'vk-jssdk';
		document.getElementsByTagName('head')[0].appendChild(el);
	}

	getVkUserById(userId) {
		this.props.dispatch(getUserByID(userId));
	}

	createVkUser(userId) {
		this.props.dispatch(createVkUser(userId));
	}
	clickVk() {
		VK.Auth.login(function (response) {
			if (response.session) {
				this.setState({vk_user_auth: response.session.user, user_type: "vk"});
				this.getVkUserById(response.session.user.id);
			}
		}.bind(this))
	};


	render() {
		return (
			<div>
				<a className="button vk" onClick={this.clickVk} role="button">
					<span>Войти через VK</span>
					<div className="icon">
						<img src={VKWhite}/>
					</div>
				</a>
			</div>
		)
	}
}
