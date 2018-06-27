import React from 'react'
import {connect} from 'react-redux'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import FaceBookLoginButton from '../src/components/user/login/facebook-login';
import VKLoginButton from '../src/components/user/login/vk-login';
import Redirector from '../src/components/user/login/redirector';
import styles from '../res/styles/user/login.scss'
import meta from '../src/components/home/components/homeMetaGenerator'
import LoginForm from '../src/components/user/login/LoginForm'
import RegistrationForm from '../src/components/user/login/RegisterForm'
import RequestNewPasswordForm from '../src/components/user/login/RequestNewPasswordForm'
import ResetPasswordForm from '../src/components/user/login/ResetPasswordForm'
import {validateVerificationUUID} from '../src/actions/user/AuthActions'

export const LOGIN_FORM = 'login';
export const REGISTRATION_FORM = 'registration';
export const REQUEST_NEW_PASSWORD_FORM = 'request';
export const REST_PASSWORD_FORM = 'reset';

export const REDIRECT_PROFILE = '/profile';

class Login extends React.Component {

    static async getInitialProps({store, query}) {
        if (query.uuid) {
            await store.dispatch(validateVerificationUUID(query.uuid));
        }
        return {uuid: query.uuid}
    }

    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            active: props.uuid ? REST_PASSWORD_FORM : LOGIN_FORM,
            uuid: props.uuid
        }
    }

    changeActive = (active) => {
        this.setState({
            active: active
        })
    };


    renderForm = (active) => {
        switch (active) {
            case LOGIN_FORM:
                return <LoginForm changeActive={this.changeActive}/>;
            case REGISTRATION_FORM:
                return <RegistrationForm changeActive={this.changeActive}/>;
            case REQUEST_NEW_PASSWORD_FORM:
                return <RequestNewPasswordForm changeActive={this.changeActive}/>;
            case REST_PASSWORD_FORM:
                return <ResetPasswordForm changeActive={this.changeActive}/>;
            default:
                return null;
        }
    };

    render() {
        return (
            <MainLayoutWithNavigation meta={meta()}>
                <style jsx>{styles}</style>

                <div className="login-form">
                    <img src="/static/img/brand/youngfolks-logo.jpg" className="login-profile-img"/>
                    <div className="profile-container">
                        <Redirector/>
                        {this.renderForm(this.state.active)}
                        <VKLoginButton/>
                        <FaceBookLoginButton/>
                    </div>
                </div>
            </MainLayoutWithNavigation>
        )
    }
}
function mapStateToProps(state) {
    const {uuid} = state;
    return uuid;
}

export default connect(mapStateToProps)(Login)
