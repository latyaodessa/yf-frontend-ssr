import React from 'react'
import {connect} from 'react-redux'
import styleSidebar from './../sidebar-style.scss'
import {TextFieldWithIcon} from '../../../../core/form/fields/TextField'
import EditUserProfilePopup from './EditUserProfilePopup'
import {EDIT_USER_DATA_EMPTY_NAME} from "../../../../../messages/profile"

class UserNameTextField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editPopup: false
        }
    }

    getUserNameField = () => {
        return <div onClick={this.changePopUpState.bind(this, false)}>
            <style jsx>{styleSidebar}</style>
            <span className="field-with-edit infos_name">{this.props.firstName} {this.props.lastName}
                {this.props.edit && <img src={"/static/img/icons/edit.png"}/>}
            </span>
        </div>
    };

    getEmptyUserNameField = () => {
        return <div onClick={this.changePopUpState.bind(this, true)}>
            <style jsx>{styleSidebar}</style>
            <span className="field-with-edit infos_name">{EDIT_USER_DATA_EMPTY_NAME}
                <img src={"/static/img/icons/edit.png"}/>
            </span>
        </div>
    };

    changePopUpState = (forceEdit) => {
        if (forceEdit || this.props.edit) {
            this.setState({
                editPopup: !this.state.editPopup
            })
        }
    };


    render() {
        return (
            <div>
                <div>
                    {this.props.firstName && this.props.lastName ?
                        this.getUserNameField()
                        : this.getEmptyUserNameField()}
                </div>
                {this.state && this.state.editPopup &&
                <EditUserProfilePopup firstName={this.props.firstName}
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


export default connect(mapStateToProps)(UserNameTextField)
