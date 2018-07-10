import React from 'react'
import {connect} from 'react-redux'
import styleSidebar from './../sidebar-style.scss'
import {TextFieldWithIcon} from '../../../../core/form/fields/TextField'
import EditNicknamePopup from './EditNicknamePopup'
import {EDIT_USER_DATA_EMPTY_NICK_NAME} from "../../../../../messages/profile"

class NicknameTextField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editPopup: false
        }
    }

    getUserNameField = () => {
        return <div>
            <style jsx>{styleSidebar}</style>
            <span className="field-with-edit infos_nick">{this.props.nickname}
                <img src={"/static/img/icons/edit.png"}/>
            </span>
        </div>
    };

    getEmptyUserNameField = () => {
        return <div>
            <style jsx>{styleSidebar}</style>
            <span className="field-with-edit infos_nick">{EDIT_USER_DATA_EMPTY_NICK_NAME}
                <img src={"/static/img/icons/edit.png"}/>
            </span>
        </div>
    };

    getEditForm = () => {
        return <div>test</div>
    };

    changePopUpState = () => {
        this.setState({
            editPopup: !this.state.editPopup
        })
    };


    render() {
        return (
            <div>
                <div onClick={this.changePopUpState.bind(this)}>
                    {this.props.firstName && this.props.lastName ?
                        this.getUserNameField()
                        : this.getEmptyUserNameField()}
                </div>
                {this.state && this.state.editPopup &&
                <EditNicknamePopup nickname={this.props.nickname}
                                      lastName={this.props.lastName}
                                      showPopUp={this.state.editPopup}
                                      changePopUpState={this.changePopUpState}/>}
            </div>
        )
    };

}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(NicknameTextField)
