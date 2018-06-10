import React from 'react';
import {connect} from 'react-redux';
import {createFBUser, getUserByFBID} from '../../../actions/user/user-actions';
import {login} from '../../../actions/core/login-logout-actions';
import styles from '../../../../res/styles/user/login.scss'


// @connect((store) => {
// 	return {
// 		user: store.user,
// 		fb_user: store.facebook
// 	}
// })
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

    componentWillReceiveProps(nextProps) {
        // if (nextProps && !this.isRegisteredUserFetchedAndExist(nextProps) && !this.isFBUserFetched(nextProps) && this.state.user_type === 'fb') {
        //     this.props.dispatch(createFBUser(this.state.user_auth));
        // }
    }

    isRegisteredUserFetchedAndExist(nextProps) {
        return nextProps.user.user && nextProps.user.fetched;
    }

    isFBUserFetched(nextProps) {
        return nextProps.facebook.user && nextProps.facebook.fetched;
    }

    loginToYF() {
        this.props.dispatch(login());
    }

    me() {
        let FB_REQUESTED_FIELDS = ['id', 'first_name', 'last_name', 'gender', 'birthday',
            'email', 'hometown', 'languages', 'locale', 'location',
            'website', 'picture.height(200).width(200)'];

        FB.api('/me?fields=' + FB_REQUESTED_FIELDS.join(','), function (res) {

            localStorage.clear();
            localStorage.setItem('user_thumbnail', res.picture.data.url);
            delete res.picture;
            console.log(res);
            this.setState({user_auth: res, user_type: "fb"});
            this.getUserByFBID(res.id);
            this.loginToYF();
        }.bind(this));
    }

    login() {
        FB.login(function (response) {
            this.me();
        }.bind(this));
    }

    getUserByFBID(userId) {
        this.props.dispatch(getUserByFBID(userId)).then(() => {

            if (this.props.user && this.props.user.fetched === true && this.props.user.user) {
                this.loginToYF();

            } else {
                if (this.state.user_auth) {
                    this.props.dispatch(createFBUser(this.state.user_auth)).then(() => {
                        this.loginToYF();
                    });
                }
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
    return state;
}

export default connect(mapStateToProps)(FaceBookLoginButton)

