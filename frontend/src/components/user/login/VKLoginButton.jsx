import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUserByVKID} from '../../../actions/user/user-actions';
import styles from '../../../../res/styles/user/login.scss'
import {login} from "../../../actions/core/login-logout-actions";

class VKLoginButton extends React.Component {

    constructor(props) {
        super(props);
        this.clickVk = this.clickVk.bind(this);
        this.getVkUserById = this.getVkUserById.bind(this);

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

    loginToYF() {
        this.props.dispatch(login());
    }

    loadSdkAsynchronously() {
        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = 'https://vk.com/js/api/openapi.js?139';
        el.async = true;
        el.id = 'vk-jssdk';
        document.getElementsByTagName('head')[0].appendChild(el);
    }

    getVkUserById(user) {
        this.props.dispatch(getUserByVKID(user.id)).then(() => {

            if (this.props.error && !this.props.data) {
                let socialUser = {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    type: 'VK',
                    dto: user
                };

                this.props.goToSocialActivation(socialUser);
            }

        })
    }


    clickVk() {
        console.log(VK);
        VK.Auth.login(function (response) {
            if (response.session) {
                this.getVkUserById(response.session.user);
            }
        }.bind(this))
    };


    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                {/*<VK apiId={4601875}>*/}
                    <a className="button vk" onClick={this.clickVk} role="button">
                        <span>Войти через VK</span>
                        <div className="icon">
                            <img src="/static/img/social/white/vk.png"/>
                        </div>
                    </a>
                {/*</VK>*/}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    let {socialUser} = state;
    return socialUser;
}

export default connect(mapStateToProps)(VKLoginButton)
