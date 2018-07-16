import React from 'react'
import {connect} from 'react-redux'
import styleSidebar from './sidebar-style.scss'
import {getCookieByKey} from "../../../../services/CookieService"
import UserNameTextField from './components/UserNameTextField'
import NicknameTextField from './components/NicknameTextField'
import ProfilePicUploader, {FRIENDLY_HOST} from './components/ProfilePicUploader'
import SidebarMenu from './SidebarMenu'
import {
    PUBLICATIONS_AMOUNT_TITLE,
    SUBSCRIBED_TITLE,
    SUBSCRIBERS_TITLE,
    FEDDBACKS_TITLE
} from "../../../../messages/profile";

const DEFAULT_PROFILE_PIC = "/static/img/brand/youngfolks-logo.jpg";

class ProfileSidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
        this.changeProfilePic = this.changeProfilePic.bind(this);
    }

    componentDidMount() {
        this.getUserData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.firstLastNameUpdate.data) {

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
    }


    changeProfilePic(newPicName) {
        this.setState({
            profilePic: FRIENDLY_HOST + newPicName + "?" + new Date().getTime()
        })
    }

    getUserData = () => {
        let user = getCookieByKey('user');
        this.setState({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName
        });

        if (user.profilePictureDTO && user.profilePictureDTO.fileName) {
            this.changeProfilePic(user.profilePictureDTO.fileName);
        } else {
            this.setState({
                profilePic: DEFAULT_PROFILE_PIC
            });
        }
    };

    editProfile = () => {
        this.setState({edit: !this.state.edit});
    };


    render() {
        return (
            <div className="container-wrapper">
                <style jsx>{styleSidebar}</style>

                <div className="profile-container">

                    {this.state && <div className="card-profile">
                        {this.state.profilePic &&
                        <img className={"pic"} src={this.state.profilePic}/>}
                        {(this.state.edit || this.state.profilePic === DEFAULT_PROFILE_PIC) &&
                        <ProfilePicUploader changeProfilePic={this.changeProfilePic}/>}
                        {/*<div className="card-profile_visual"/>*/}
                        <div className="card-profile_user-infos">
                            {this.state &&
                            <UserNameTextField
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                edit={this.state.edit}/>}
                            {this.state && <NicknameTextField
                                nickname={this.state.nickName}
                                edit={this.state.edit}/>}
                            {/*<a href="#"/>*/}
                        </div>

                        <div className="card-profile_user-stats">
                            <div className="stats-holder">
                                <div className="user-stats">
                                    <strong>{PUBLICATIONS_AMOUNT_TITLE}</strong>
                                    <span>0</span>
                                </div>
                                <div className="user-stats">
                                    <strong>{FEDDBACKS_TITLE}</strong>
                                    <span>0</span>
                                </div>
                                {/*<div className="user-stats">*/}
                                {/*<strong>{SUBSCRIBERS_TITLE}</strong>*/}
                                {/*<span>0</span>*/}
                                {/*</div>*/}
                            </div>
                        </div>

                    </div>
                    }

                </div>
                <SidebarMenu editProfile={this.editProfile} edit={this.state.edit}/>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const {firstLastNameUpdate, nickNameUpdate, upload} = state;
    return {
        firstLastNameUpdate: firstLastNameUpdate,
        nickNameUpdate: nickNameUpdate,
        upload: upload
    };
}


export default connect(mapStateToProps)(ProfileSidebar)
