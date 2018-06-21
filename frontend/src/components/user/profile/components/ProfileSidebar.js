import React from 'react'
import {connect} from 'react-redux'
import {ProfileSidebarAvatar} from './ProfileSidebarAvatar'
import styleSidebar from './sidebar-style.scss'

class ProfileSidebar extends React.Component {

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
            <div className="container-wrapper">
                <style jsx>{styleSidebar}</style>

                <div className="profile-container">

                    <div className="card-profile">
                        <div className="card-profile_visual"/>

                        <div className="card-profile_user-infos">
                            <span className="infos_name">Emma Watson</span>
                            <span className="infos_nick">@EmWatson</span>

                            <a href="#"/>
                        </div>

                        <div className="card-profile_user-stats">
                            <div className="stats-holder">
                                <div className="user-stats">
                                    <strong>Tweets</strong>
                                    <span>1,337</span>
                                </div>
                                <div className="user-stats">
                                    <strong>Following</strong>
                                    <span>561</span>
                                </div>
                                <div className="user-stats">
                                    <strong>Followers</strong>
                                    <span>718</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(ProfileSidebar)


const style = {

};
