import React from 'react'
import {connect} from 'react-redux'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import meta from '../src/components/home/components/homeMetaGenerator'
import {Link} from '../routes'
import ProfilePage from '../src/components/user/profile/ProfilePage'

class UserDashboard extends React.Component {
    static async getInitialProps({store, isServer}) {
        return {isServer}
    }


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const userId = localStorage.getItem("user_id");

        this.setState({
            userId: userId
        });
    }


    render() {
        return (
            <MainLayoutWithNavigation meta={meta()}>
                <ProfilePage/>
            </MainLayoutWithNavigation>
        )
    }
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(UserDashboard)
