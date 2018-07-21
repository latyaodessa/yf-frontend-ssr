import React from 'react';
import {connect} from 'react-redux';
import {getUserByFBID} from '../../../actions/user/user-actions';
import {login} from '../../../actions/core/login-logout-actions';
import styles from '../../../../res/styles/user/login.scss'
import {setAuthCookie} from "../../../services/CookieService";
import Router from "next/router";
import {REDIRECT_PROFILE} from "../../../../pages/auth";


class FaceBookLoginButton extends React.Component {

    constructor(props) {
        super(props);
        this.me = this.me.bind(this);
        this.login = this.login.bind(this);
        this.getUserByFBID = this.getUserByFBID.bind(this);
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


    me() {
        let FB_REQUESTED_FIELDS = ['id', 'first_name', 'last_name', 'gender', 'birthday', 'hometown', 'languages', 'locale', 'location',
            'website', 'picture.height(200).width(200)'];

        FB.api('/me?fields=' + FB_REQUESTED_FIELDS.join(','), function (res) {
            // TODO upload avatar
            // localStorage.setItem('user_thumbnail', res.picture.data.url);
            if (!res.error) {
                delete res.picture;
                this.setState({user_auth: res});
                this.getUserByFBID(res.id);
            }
        }.bind(this));
    }

    login() {
        FB.login(function (response) {
            this.me();
        }.bind(this));
    }

    getUserByFBID(userId) {
        this.props.dispatch(getUserByFBID(userId)).then(() => {
            if (this.props.error && !this.props.data) {
                let socialUser = {
                    id: this.state.user_auth.id,
                    firstName: this.state.user_auth.first_name,
                    lastName: this.state.user_auth.last_name,
                    type: 'FB',
                    dto: this.state.user_auth
                };

                this.props.goToSocialActivation(socialUser);
            } else if (this.props.data) {
                setAuthCookie(this.props.data.user, this.props.data.token);
                Router.push(REDIRECT_PROFILE);
            }

        });
    }

    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                <a className="button fb" onClick={this.login} role="button">
                    <span>Войти через FB</span>
                    <div className="icon">
                        <img src="/static/img/social/white/fb.png"/>
                    </div>
                </a>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {socialUser} = state;
    return socialUser;
}

export default connect(mapStateToProps)(FaceBookLoginButton)
