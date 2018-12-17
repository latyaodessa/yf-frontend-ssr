import React from 'react'
import {connect} from 'react-redux'
import style from './login-style.scss'
import {
    BACK_TO_LOGIN_LINK,
    REGISTER_LINK,
    REQUEST_NEW_PASSWORD_FROM_TITLE,
    REQUEST_RESET_BUTTON,
    REQUEST_SUCCESSED
} from '../../../messages/auth/auth'
import {LOGIN_FORM, REGISTRATION_FORM} from '../../../../pages/auth'
import {TextFieldEmail} from '../../core/form/fields/TextField'
import SmallForm from '../../core/form/forms/SmallForm'
import {requestResetPassword} from "../../../actions/user/AuthActions";
import {ERRORS} from "../../../messages/errors";
import {SuccessComponent} from './components/SuccessComponent'
import {SubmitButton} from '../../core/form/buttons/Button'

class RequestNewPasswordForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: {value: '', valid: true, errorMessage: ''},
            fetching: false,
            requested: false
        }
    }

    updateInputValue = (evt) => {
        this.setState({
            [evt.target.name]: {value: evt.target.value, valid: true}
        });
    };

    handleSubmit = (evt) => {
        this.setState({fetching: true});

        evt.preventDefault();
        if (this.state.email.value) {
            this.props.dispatch(requestResetPassword(this.state.email.value)).then(() => {
                this.setState({fetching: false});
                if (this.props.error) {
                    this.handleErrors(this.props.error.data);
                } else {
                    this.setState({requested: true});
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
            default:
                this.setState({
                    email: {
                        value: this.state.email.value,
                        valid: false,
                        errorMessage: ERRORS.DEFAULT_ERROR.transaction
                    }
                });
                break;
        }
    };

    render() {
        return (
            <SmallForm handleSubmit={this.handleSubmit} title={REQUEST_NEW_PASSWORD_FROM_TITLE}>

                {this.state.requested ? <SuccessComponent label={REQUEST_SUCCESSED}/> :
                    <div>
                        <TextFieldEmail updateInputValue={this.updateInputValue} data={this.state.email}/>
                        <SubmitButton title={REQUEST_RESET_BUTTON} fetching={this.state.fetching}/>
                        <div className="form-footer">
                            <style jsx>{style}</style>
                            <p><a onClick={this.props.changeActive.bind(this, LOGIN_FORM)}>{BACK_TO_LOGIN_LINK}</a></p>
                            <p><a onClick={this.props.changeActive.bind(this, REGISTRATION_FORM)}>{REGISTER_LINK}</a>
                            </p>
                        </div>
                    </div>
                }
            </SmallForm>
        )
    }
}

function mapStateToProps(state) {
    const {requestPassword} = state;
    return requestPassword;
}

export default connect(mapStateToProps)(RequestNewPasswordForm)
