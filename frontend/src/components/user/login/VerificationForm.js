import React from 'react'
import {connect} from 'react-redux'
import style from './login-style.scss'
import {TO_PROFILE_LINK, VERIFICATION_FROM_TITLE, VERIFICATION_WRONG, VERIFIED_LABEL} from '../../../messages/auth/auth'
import SmallForm from '../../core/form/forms/SmallForm'
import {ErrorComponent} from './components/ErrorComponent'
import {SuccessComponent} from './components/SuccessComponent'
import {Link} from '../../../../routes';


class VerificationForm extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
    };

    render() {
        return (

            <SmallForm handleSubmit={this.handleSubmit} title={VERIFICATION_FROM_TITLE}>

                {this.props.valid ? <SuccessComponent label={VERIFIED_LABEL}/> :
                    <ErrorComponent label={VERIFICATION_WRONG}/>
                }

                <div className="form-footer">
                    <style jsx>{style}</style>
                    <div className="button-panel">
                        <p>
                            <Link route='profile'>
                                <a>{TO_PROFILE_LINK}</a>
                            </Link>
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

export default connect(mapStateToProps)(VerificationForm)

