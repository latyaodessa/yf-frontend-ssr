import React from 'react'
import {connect} from 'react-redux'
import style from './login-style.scss'
import {
    BACK_TO_LOGIN_LINK,
    FORGOT_PASS_LINK_REPEAT,
    PASSWORD,
    PASSWORD_CHANGED,
    PASSWORD_REPEAT,
    RESET_BUTTON,
    RESET_PASSWORD_FROM_TITLE,
    UUID_WRONG
} from '../../../messages/auth/auth'
import {TextFieldPassword} from '../../core/form/fields/TextField'
import {SubmitButton} from '../../core/form/buttons/Button'
import SmallForm from '../../core/form/forms/SmallForm'
import {LOGIN_FORM, REQUEST_NEW_PASSWORD_FORM} from '../../../../pages/auth'
import {ERRORS} from "../../../messages/errors";
import {ErrorComponent} from './components/ErrorComponent'
import {SuccessComponent} from './components/SuccessComponent'

import {resetPassword} from "../../../actions/user/AuthActions";

export const REDIRECT_LOGIN = '/auth';

class ResetPasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: {value: '', valid: true, errorMessage: ''},
            repeat_password: {value: '', valid: true, errorMessage: ''},
            fetching: false,
            success: false
        }
    }

    updateInputValue = (evt) => {
        this.setState({
            [evt.target.name]: {value: evt.target.value, valid: true}
        });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        if (this.state.password.value && this.state.repeat_password.value) {

            if (!this.isPasswordsMatching()) {
                return;
            }
            this.setState({fetching: true});

            this.props.dispatch(resetPassword(this.props.uuid.data.verification, this.state.password.value, this.state.repeat_password.value)).then(() => {
                this.setState({fetching: false});
                if (this.props.reset.error) {
                    this.handleErrors(this.props.reset.error.data);
                }
                else {
                    this.setState({success: true});
                }
            });
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
            case ERRORS.PASSWORDS_NOT_MATCING.name:
                this.setState({
                    password: {
                        value: this.state.password.value,
                        valid: false,
                        errorMessage: ERRORS.PASSWORDS_NOT_MATCING.transaction
                    }
                });
                break;
            case ERRORS.VERIFICATION_NOT_VALID.name:
                this.setState({
                    password: {
                        value: this.state.password.value,
                        valid: false,
                        errorMessage: ERRORS.VERIFICATION_NOT_VALID.transaction
                    }
                });
                break;
            case ERRORS.PASSWORD_NOT_VALID.name:
                this.setState({
                    password: {
                        value: this.state.password.value,
                        valid: false,
                        errorMessage: ERRORS.PASSWORD_NOT_VALID.transaction
                    }
                });
                break;
            case ERRORS.NOT_EXIST.name:
                this.setState({
                    password: {
                        value: this.state.password.value,
                        valid: false,
                        errorMessage: ERRORS.NOT_EXIST.transaction
                    }
                });
                break;
            default:
                this.setState({
                    password: {
                        value: this.state.password.value,
                        valid: false,
                        errorMessage: ERRORS.DEFAULT_ERROR.transaction
                    }
                });
                break;
        }
    };


    render() {
        return (

            <SmallForm handleSubmit={this.handleSubmit} title={RESET_PASSWORD_FROM_TITLE}>

                {this.state.success ? <SuccessComponent label={PASSWORD_CHANGED}/> :

                    <div>

                        {this.props.uuid.error ? <ErrorComponent label={UUID_WRONG}/> :
                            <div>
                                <TextFieldPassword placeholder={PASSWORD} updateInputValue={this.updateInputValue}
                                                   data={this.state.password}
                                                   current={false} name={"password"}/>
                                <TextFieldPassword placeholder={PASSWORD_REPEAT}
                                                   updateInputValue={this.updateInputValue}
                                                   data={this.state.password}
                                                   current={false} name={"repeat_password"}/>

                                <SubmitButton title={RESET_BUTTON} fetching={this.state.fetching}/>


                            </div>
                        }

                    </div>
                }

                <div className="form-footer">
                    <style jsx>{style}</style>
                    <div className="button-panel">
                        <p><a
                            onClick={this.props.changeActive.bind(this, REQUEST_NEW_PASSWORD_FORM)}>{FORGOT_PASS_LINK_REPEAT}</a>
                        </p>
                        <p><a onClick={this.props.changeActive.bind(this, LOGIN_FORM)}>{BACK_TO_LOGIN_LINK}</a>
                        </p>

                    </div>
                </div>
            </SmallForm>
        )
    }
}

function mapStateToProps(state) {
    const {uuid, reset} = state;
    return {uuid: uuid, reset: reset};
}

export default connect(mapStateToProps)(ResetPasswordForm)

