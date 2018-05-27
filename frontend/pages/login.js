import React from 'react'
import {connect} from 'react-redux'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import FaceBookLoginButton from '../src/components/user/login/facebook-login';
import VKLoginButton from '../src/components/user/login/vk-login';
import Redirector from '../src/components/user/login/redirector';
import styles from '../res/styles/user/login.scss'
import meta from '../src/components/home/components/homeMetaGenerator'

class Index extends React.Component {
    static async getInitialProps({store, isServer}) {


        return {isServer}
    }

    render() {
        return (
            <MainLayoutWithNavigation meta={meta}>
                <style jsx>{styles}</style>
                <div className="child-container">
                    <div className="wrapper">
                        <div className="content-wrapper">
                            <div className="content">
                                <div className="login-form">
                                    <img src="/static/img/brand/youngfolks-logo.jpg" className="login-profile-img"/>
                                    <div className="profile-container">
                                        <Redirector/>
                                        <VKLoginButton/>
                                        <FaceBookLoginButton/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayoutWithNavigation>
        )
    }
}

export default connect()(Index)
