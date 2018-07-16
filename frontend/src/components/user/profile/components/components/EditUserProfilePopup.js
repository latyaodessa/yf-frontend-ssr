import React from 'react'
import {connect} from 'react-redux'
import {
    EDIT_USER_DATA_TITLE,
    EDIT_USER_DATA_FIRST_NAME,
    EDIT_USER_DATA_LAST_NAME,
    EDIT_USER_DATA_NICK_NAME
} from "../../../../../messages/profile"
import {SAVE} from "../../../../../messages/core"
import {updateUserFirstLastName} from '../../../../../actions/user/profileActions'
import FormModalWindow from '../../../../core/modal/FormModalWindow'
import {SubmitButton} from '../../../../core/form/buttons/Button'
import {RequiredTextField} from '../../../../core/form/fields/TextField'
import {getCookieByKey, setAuthCookie, USER, TOKEN} from '../../../../../services/CookieService'
import {ERRORS} from "../../../../../messages/errors";
import Router from "next/router";
import {REDIRECT_PROFILE} from "../../../../../../pages/auth";

class EditUserProfilePopup extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            fetching: false,
            firstName: {value: this.props.firstName, valid: true, errorMessage: ''},
            lastName: {value: this.props.lastName, valid: true, errorMessage: ''}
        });

    }

    handleSubmit = (evt) => {
        this.setState({fetching: true});
        evt.preventDefault();
        const userId = getCookieByKey(USER).id;
        const token = getCookieByKey(TOKEN);
        console.log(this.state);
        this.props.dispatch(updateUserFirstLastName(userId,
            token,
            this.state.firstName.value,
            this.state.lastName.value)).then(() => {
            console.log(this.props);
            if (this.props.data) {
                setAuthCookie(this.props.data.user, this.props.data.token);
                this.props.changePopUpState(true);
            }
        })
    };

    updateInputValue = (evt) => {
        this.setState({
            [evt.target.name]: {value: evt.target.value, valid: true}
        });
    };

    render() {
        return (
            <div>
                {this.state && <FormModalWindow
                    handleSubmit={this.handleSubmit}
                    showPopUp={this.props.showPopUp}
                    close={this.props.changePopUpState}
                    popupTitle={EDIT_USER_DATA_TITLE}
                    type={this.state.error}>
                    <RequiredTextField name={"firstName"} placeholder={EDIT_USER_DATA_FIRST_NAME}
                                       updateInputValue={this.updateInputValue}
                                       data={this.state.firstName}/>
                    <RequiredTextField name={"lastName"} placeholder={EDIT_USER_DATA_LAST_NAME}
                                       updateInputValue={this.updateInputValue}
                                       data={this.state.lastName}/>
                    <SubmitButton title={SAVE} fetching={this.state.fetching}/>
                </FormModalWindow>}

            </div>
        )
    };

}

function mapStateToProps(state) {
    const {firstLastNameUpdate} = state;
    return firstLastNameUpdate;
}


export default connect(mapStateToProps)(EditUserProfilePopup)
