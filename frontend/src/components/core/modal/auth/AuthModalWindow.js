import React from "react";
import Modal from 'react-modal';
import FullWidthForm from "../../form/forms/FullWidthForm";
import RegistrationForm from '../../../user/login/RegisterForm'
import SocialAuthorizationForm from '../../../user/login/SocialAuthorizationForm'
import RequestNewPasswordForm from '../../../user/login/RequestNewPasswordForm'
import ResetPasswordForm from '../../../user/login/ResetPasswordForm'
import VKLoginButton from '../../../user/login/VKLoginButton';
import styles from '../../../../../res/styles/user/login.scss'
import LoginForm from '../../../user/login/LoginForm'
import FaceBookLoginButton from '../../../user/login/facebook-login';

import {
    AUTH_SOCIAL_FORM,
    LOGIN_FORM,
    REGISTRATION_FORM,
    REQUEST_NEW_PASSWORD_FORM,
    REST_PASSWORD_FORM
} from "../../../../../pages/auth";

export const MESSAGE_TYPES = {
    WARNING: "warning",
    ERROR: 'error',
    INFO: 'info'
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        background: 'transparent',
        marginRight: '0',
        transform: 'none',
        borderRadius: 0,
        border: 'none',
        padding: '10px 20px 10px 20px',
        position: 'initial'
    },
    overlay: {
        background: 'rgba(78, 77, 77, 0.75)'
    }
};
Modal.setAppElement("#__next");

class AuthModalWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopUp: this.props.showPopUp,
            active: props.uuid ? REST_PASSWORD_FORM : LOGIN_FORM,
            uuid: props.uuid,
            socialUserData: ''
        };

        switch (this.props.type) {
            case MESSAGE_TYPES.WARNING:
                // customStyles.content.background = '#ff7135';
                break;
            case MESSAGE_TYPES.ERROR:
                customStyles.content.background = '#ff3535';
            default:
                break;
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.showPopUp !== this.props.showPopUp) {
            this.setState({showPopUp: this.props.showPopUp});
        }
    }

    changeActive = (active) => {
        this.setState({
            active: active
        })
    };

    goToSocialActivation = (socialUserData) => {
        this.setState({
            socialUserData: socialUserData,
            active: AUTH_SOCIAL_FORM
        })
    };

    stayOnPage = () => {
        this.props.close();
        this.props.handleSubmit();
    };

    renderForm = (active) => {
        switch (active) {
            case LOGIN_FORM:
                return <LoginForm changeActive={this.changeActive} stayOnPage={this.stayOnPage}/>;
            case REGISTRATION_FORM:
                return <RegistrationForm changeActive={this.changeActive} stayOnPage={this.stayOnPage}/>;
            case REQUEST_NEW_PASSWORD_FORM:
                return <RequestNewPasswordForm changeActive={this.changeActive} stayOnPage={this.stayOnPage}/>;
            case REST_PASSWORD_FORM:
                return <ResetPasswordForm changeActive={this.changeActive} stayOnPage={this.stayOnPage}/>;
            case AUTH_SOCIAL_FORM:
                return <SocialAuthorizationForm socialUserData={this.state.socialUserData}
                                                stayOnPage={this.stayOnPage}/>;
            default:
                return null;
        }
    };


    render() {
        return (
            <Modal
                isOpen={this.state.showPopUp}
                onRequestClose={this.props.close}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <style jsx>{styles}</style>
                <FullWidthForm handleSubmit={() => console.log("submit")} title={this.props.popupTitle}>
                    <div className="login-form">
                        <img src={'/static/img/brand/youngfolks-logo.jpg'} className="login-profile-img"/>
                        <div className="profile-container">
                            {this.renderForm(this.state.active)}
                            {this.state.active !== AUTH_SOCIAL_FORM && <div>
                                <VKLoginButton goToSocialActivation={this.goToSocialActivation}/>
                                <FaceBookLoginButton goToSocialActivation={this.goToSocialActivation}/>
                            </div>
                            }
                        </div>
                    </div>
                </FullWidthForm>
            </Modal>
        )
    }
}


export default AuthModalWindow;
