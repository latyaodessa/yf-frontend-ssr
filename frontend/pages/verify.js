import React from 'react'
import {connect} from 'react-redux'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import Redirector from '../src/components/user/login/redirector';
import styles from '../res/styles/user/login.scss'
import meta from '../src/components/home/components/homeMetaGenerator'
import {verifyVerification} from '../src/actions/user/AuthActions'
import VerificationForm from '../src/components/user/login/VerificationForm'


export const REDIRECT_PROFILE = '/profile';

class Login extends React.Component {

    static async getInitialProps({store, query}) {
        if (query.uuid) {
            await store.dispatch(verifyVerification(query.uuid));
        }

        return {uuid: query.uuid}
    }

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <MainLayoutWithNavigation meta={meta()}>
                <style jsx>{styles}</style>

                <div className="login-form">
                    <img src="/static/img/brand/youngfolks-logo.jpg" className="login-profile-img"/>
                    <div className="profile-container">
                        <VerificationForm valid={!this.props.error}/>
                    </div>
                </div>
            </MainLayoutWithNavigation>
        )
    }
}

function mapStateToProps(state) {
    const {verify} = state;
    return verify;
}

export default connect(mapStateToProps)(Login)
