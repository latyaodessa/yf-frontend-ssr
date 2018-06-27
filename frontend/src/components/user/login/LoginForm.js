import React from 'react'
import {connect} from 'react-redux'
import style from './login-style.scss'
import {
    FORGOT_PASS_LINK,
    PASSWORD,
    REGISTER_LINK,
    SIGN_IN_BUTTON,
    SIGN_IN_FROM_TITLE
} from '../../../messages/auth/auth'
import {REDIRECT_PROFILE, REGISTRATION_FORM, REQUEST_NEW_PASSWORD_FORM} from '../../../../pages/auth'
import {TextFieldEmail, TextFieldPassword} from '../../core/form/fields/TextField'
import {SubmitButton} from '../../core/form/buttons/Button'
import SmallForm from '../../core/form/forms/SmallForm'
import {login} from './../../../actions/user/AuthActions'
import {ERRORS} from '../../../messages/errors'
import {setAuthCookie} from './../../../services/CookieService'
import Router from 'next/router';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: {value: '', valid: true, errorMessage: ''},
            password: {value: '', valid: true, errorMessage: ''},
            fetching: false
        }
    }

    updateInputValue = (evt) => {
        this.setState({
            [evt.target.name]: {value: evt.target.value, valid: true}
        });
    };

    handleSubmit = (evt) => {
        console.log(this.state);
        this.setState({fetching: true});

        evt.preventDefault();
        if (this.state.email.value && this.state.password.value) {
            this.props.dispatch(login(this.state.email.value, this.state.password.value)).then(() => {
                this.setState({fetching: false});
                if (this.props.error) {
                    this.handleErrors(this.props.error.data);
                }
                else if (this.props.data) {
                    setAuthCookie(this.props.data.user, this.props.data.token);
                    Router.push(REDIRECT_PROFILE);
                }
            });
        }
    };

    handleErrors = (errorMessage) => {
        switch (errorMessage) {
            case ERRORS.NOT_EXIST.name:
                this.setState({
                    email: {value: this.state.email.value, valid: false, errorMessage: ERRORS.NOT_EXIST.transaction}
                });
                break;
            case ERRORS.WRONG_PASSWORD.name:
                this.setState({
                    password: {
                        value: this.state.password.value,
                        valid: false,
                        errorMessage: ERRORS.WRONG_PASSWORD.transaction
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
                    }
                });
                break;
        }
    };


    render() {
        return (
            <SmallForm handleSubmit={this.handleSubmit} title={SIGN_IN_FROM_TITLE}>

                <TextFieldEmail updateInputValue={this.updateInputValue} data={this.state.email}/>

                <TextFieldPassword placeholder={PASSWORD} updateInputValue={this.updateInputValue} data={this.state.password}
                                   current={true} name={"password"}/>

                <SubmitButton title={SIGN_IN_BUTTON} fetching={this.state.fetching}/>

                <div className="form-footer">
                    <style jsx>{style}</style>
                    <p><a onClick={this.props.changeActive.bind(this, REGISTRATION_FORM)}>{REGISTER_LINK}</a></p>
                    <p><a
                        onClick={this.props.changeActive.bind(this, REQUEST_NEW_PASSWORD_FORM)}>{FORGOT_PASS_LINK}</a>
                    </p>
                </div>
            </SmallForm>
        )
    }
}

function mapStateToProps(state) {
    const {login} = state;
    return login;
}

export default connect(mapStateToProps)(LoginForm)
