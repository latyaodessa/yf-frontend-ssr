import React from 'react'
import {connect} from 'react-redux'
import styleSidebar from './sidebar-style.scss'
import {getCookieByKey} from "../../../../services/CookieService"
import UserNameTextField from './components/UserNameTextField'
import NicknameTextField from './components/NicknameTextField'
import ProfilePicUploader from './components/ProfilePicUploader'

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

        if (this.state.nickName !== this.props.nickNameUpdate.data.user.user.nickName) {
            this.setState({nickName: this.props.nickNameUpdate.data.user.user.nickName})
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


    render() {
        return (
            <div className="container-wrapper">
                <style jsx>{styleSidebar}</style>

                <div className="profile-container">

                    <div className="card-profile">
                        <img className={"pic"} src={"/static/img/brand/youngfolks-logo.jpg"}/>
                        <ProfilePicUploader />
                        {/*<div className="card-profile_visual"/>*/}
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
    return {
        firstLastNameUpdate: firstLastNameUpdate,
        nickNameUpdate: nickNameUpdate
    };
}


export default connect(mapStateToProps)(ProfileSidebar)
