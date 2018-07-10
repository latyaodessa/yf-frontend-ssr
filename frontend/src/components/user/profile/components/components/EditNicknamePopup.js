import React from 'react'
import {connect} from 'react-redux'
import {EDIT_USER_DATA_NICK_NAME, EDIT_USER_NICKNAME_TITLE} from "../../../../../messages/profile"
import {SAVE} from "../../../../../messages/core"

import FormModalWindow from '../../../../core/modal/FormModalWindow'
import {SubmitButton} from '../../../../core/form/buttons/Button'
import {RequiredTextField} from '../../../../core/form/fields/TextField'
import {updateUserNickname} from "../../../../../actions/user/profileActions";
import {getCookieByKey, setAuthCookie, TOKEN, USER} from "../../../../../services/CookieService";

class EditNicknamePopup extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            fetching: false,
            nickname: {value: this.props.nickname, valid: true, errorMessage: ''}
        });

    }

    handleSubmit = (evt) => {
        this.setState({fetching: true});
        evt.preventDefault();
        const userId = getCookieByKey(USER).id;
        const token = getCookieByKey(TOKEN);
        console.log(this.state);
        this.props.dispatch(updateUserNickname(userId,
            token,
            this.state.nickname.value)).then(() => {
                console.log(this.porps);
            if (this.props.data) {
                setAuthCookie(this.props.data.user, this.props.data.token);
                this.props.changePopUpState();
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
                    popupTitle={EDIT_USER_NICKNAME_TITLE}
                    type={this.state.error}>
                    <RequiredTextField placeholder={EDIT_USER_DATA_NICK_NAME} updateInputValue={this.updateInputValue} data={this.state.nickname}/>
                    <SubmitButton title={SAVE} fetching={this.state.fetching}/>
                </FormModalWindow>}

            </div>
        )
    };

}


function mapStateToProps(state) {
    console.log(this.state);
    const {nickNameUpdate} = state;
    return nickNameUpdate;
}



export default connect(mapStateToProps)(EditNicknamePopup)
