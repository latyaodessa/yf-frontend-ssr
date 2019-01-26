import React from 'react'
import {connect} from 'react-redux'
import {PASSWORD, PASSWORD_REPEAT, SOCIAL_AUTH_BUTTON, SOCICAL_AUTH_FROM_TITLE} from '../../../messages/auth/auth'
import {REDIRECT_PROFILE} from '../../../../pages/auth'
import {TextFieldEmail, TextFieldPassword} from '../../core/form/fields/TextField'
import {SubmitButton} from '../../core/form/buttons/Button'
import SmallForm from '../../core/form/forms/SmallForm'
import {ERRORS} from "../../../messages/errors";
import {setAuthCookie} from "../../../services/CookieService";
import Router from "next/router";
import {createFBUser, createVkUser} from "../../../actions/user/user-actions";
class SocialAuthorizationForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: {value: '', valid: true, errorMessage: ''},
            password: {value: '', valid: true, errorMessage: ''},
            repeat_password: {value: '', valid: true, errorMessage: ''},
            fetching: false
        }
    }

    updateInputValue = (evt) => {
        this.setState({
            [evt.target.name]: {value: evt.target.value, valid: true}
        });
    };

    handleSubmit = (evt) => {

        evt.preventDefault();
        if (this.state.email.value && this.state.password.value && this.state.repeat_password.value) {

            if (!this.isPasswordsMatching()) {
                return;
            }
            this.setState({fetching: true});

            if (this.props.socialUserData.type === 'VK') {
                this.props.dispatch(createVkUser(this.props.socialUserData.id, this.state.email.value, this.state.password.value)).then(() => {
                    this.setState({fetching: false});
                    if (this.props.error) {
                        this.handleErrors(this.props.error.data);
                    } else if (this.props.data) {
                        setAuthCookie(this.props.data.user, this.props.data.token);
                        Router.push(REDIRECT_PROFILE);
                    }
                });
            } else if (this.props.socialUserData.type === 'FB') {
                this.props.dispatch(createFBUser(this.props.socialUserData.dto, this.state.email.value, this.state.password.value)).then(() => {
                    this.setState({fetching: false});
                    if (this.props.error) {
                        this.handleErrors(this.props.error.data);
                    } else if (this.props.data) {
                        setAuthCookie(this.props.data.user, this.props.data.token);
                        Router.push(REDIRECT_PROFILE);
                    }
                });
            }

        }
    };

    isPasswordsMatching() {
        if (this.state.password.value !== this.state.repeat_password.value) {
            this.setState({
                password: {
                    value: this.state.password.value,
                    valid: false,
                    errorMessage: ERRORS.PASSWORDS_NOT_MATCING.transaction
                },
                repeat_password: {
                    value: this.state.repeat_password.value,
                    valid: false,
                    errorMessage: ERRORS.PASSWORDS_NOT_MATCING.transaction
                }
            });
            return false;
        }
        return true;
    }

    handleErrors = (errorMessage) => {
        switch (errorMessage) {
            case ERRORS.USER_ALREADY_EXIST.name:
                this.setState({
                    email: {
                        value: this.state.email.value,
                        valid: false,
                        errorMessage: ERRORS.USER_ALREADY_EXIST.transaction
                    }
                });
                break;
            case ERRORS.PASSWORD_NOT_VALID.name:
                this.setState({
                    password: {
                        value: this.state.password.value,
                        valid: false,
                        errorMessage: ERRORS.PASSWORD_NOT_VALID.transaction
                    },
                    repeat_password: {
                        value: this.state.password.value,
                        valid: false,
                        errorMessage: ERRORS.PASSWORD_NOT_VALID.transaction
                    }
                });
                break;
            default:
                this.setState({
                    email: {
                        value: this.state.email.value,
                        valid: false,
                        errorMessage: ERRORS.DEFAULT_ERROR.transaction
                    },
                    password: {
                        value: this.state.password.value,
                        valid: false,
                        errorMessage: ERRORS.DEFAULT_ERROR.transaction
                    },
                    repeat_password: {
                        value: this.state.repeat_password.value,
                        valid: false,
                        errorMessage: ERRORS.DEFAULT_ERROR.transaction
                    }
                });
                break;
        }
    };


    render() {
        return (
            <SmallForm handleSubmit={this.handleSubmit} title={SOCICAL_AUTH_FROM_TITLE}>

                <div>
                    <h2>{this.props.socialUserData.firstName} {this.props.socialUserData.lastName}</h2>
                </div>

                <TextFieldEmail updateInputValue={this.updateInputValue} data={this.state.email}/>

                <TextFieldPassword placeholder={PASSWORD} updateInputValue={this.updateInputValue}
                                   data={this.state.password}
                                   current={false} name={"password"}/>
                <TextFieldPassword placeholder={PASSWORD_REPEAT} updateInputValue={this.updateInputValue}
                                   data={this.state.password}
                                   current={false} name={"repeat_password"}/>

                <SubmitButton title={SOCIAL_AUTH_BUTTON} fetching={this.state.fetching}/>

            </SmallForm>
        )
    }
}

function mapStateToProps(state) {
    const {register} = state;
    return register;
}

export default connect(mapStateToProps)(SocialAuthorizationForm)
