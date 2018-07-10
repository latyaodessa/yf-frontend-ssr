import React from 'react'
import {connect} from 'react-redux'
import styleSidebar from './sidebar-style.scss'
import {getCookieByKey} from "../../../../services/CookieService"
import UserNameTextField from './components/UserNameTextField'
import NicknameTextField from './components/NicknameTextField'
import {getRelatedPosts} from "../../../../actions/post/single-post-actions";

class ProfileSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getUserData();
    }

    componentDidUpdate(prevProps) {
        console.log(this.props);

        if (!this.props.firstLastNameUpdate.data) {
            return;
        }

        if (this.state.firstName !== this.props.firstLastNameUpdate.data.user.user.firstName) {
            this.setState({firstName: this.props.firstLastNameUpdate.data.user.user.firstName})
        }
        if (this.state.lastName !== this.props.firstLastNameUpdate.data.user.user.lastName) {
            this.setState({lastName: this.props.firstLastNameUpdate.data.user.user.lastName})
        }
    }


    getUserData = () => {
        let user = getCookieByKey('user');
        this.setState({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName
        });
    };

    renderNickName = () => {
        if (this.state.nickName) {
            return <div>
                <style jsx>{styleSidebar}</style>
                <span className="infos_nick">{this.state.nickName}</span></div>
        }
        return <div>
            <style jsx>{styleSidebar}</style>
            <span className="infos_nick">NO NAME</span>
        </div>
    };


    render() {
        return (
            <div className="container-wrapper">
                <style jsx>{styleSidebar}</style>

                <div className="profile-container">

                    <div className="card-profile">
                        <div className="card-profile_visual"/>

                        <div className="card-profile_user-infos">
                            {this.state &&
                            <UserNameTextField
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}/>}
                            {this.state && <NicknameTextField nickname={this.state.nickName}/>}
                            {/*<a href="#"/>*/}
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
    const {firstLastNameUpdate, nickNameUpdate} = state;
    return {firstLastNameUpdate: firstLastNameUpdate,
        nickNameUpdate: nickNameUpdate};
}


export default connect(mapStateToProps)(ProfileSidebar)
