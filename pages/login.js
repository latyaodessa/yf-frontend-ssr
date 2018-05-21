import React from 'react'
import {connect} from 'react-redux'
import MainLayoutEmpty from '../src/components/layouts/MainLayoutEmpty'


class Index extends React.Component {
    static async getInitialProps({store, isServer}) {


        return {isServer}
    }

    render() {
        return (
            <MainLayoutEmpty>
                    <div className="login-form">
                      <img src="/static/img/brand/youngfolks-logo.jpg" className="login-profile-img"/>
                      <div className="profile-container">

                      </div>
                    </div>
            </MainLayoutEmpty>
        )
    }
}

export default connect()(Index)
