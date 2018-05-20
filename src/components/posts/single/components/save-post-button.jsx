import React from 'react';
import {connect} from 'react-redux';
import {savePostToDashboard} from "../../../../actions/user/dashboard-actions";
import SavePostIcon from "../../../../res/img/64/save_post.png";
import PostSavedIcon from "../../../../res/img/64/post_saved.png";
import PopUp from "./buttons/confirmation-popup-component"


@connect((store) => {
	return {
		savedPost: store.savePost.fetched
	}
})
export default class SavePostButton extends React.Component {

	constructor(props) {
		super(props);
		this.showClosePopup = this.showClosePopup.bind(this);
		this.state = {
			showPopUp: false,
			popUpData: ""
		}
	}

	showClosePopup(){
		this.setState({
			showPopUp: false
		})
	}



	render() {
		return (
			<div className="button-container">
				{this.state.showPopUp ?
				<PopUp popupHandler={this.showClosePopup} popUpData={this.state.popUpData}/>
				: null}
				<div className="save-button-icon">
					{this.props.existence ? this.getButtonAlreadySaved(): this.getButtonToSave()}
				</div>
			</div>
		)
	}

	getButtonToSave() {
		return <img src={SavePostIcon} onClick={this.savePost.bind(this)}/>;
	}

	getButtonAlreadySaved() {
		return <img src={PostSavedIcon} onClick={this.savePost.bind(this)}/>;
	}



	savePost() {
		if(this.props.existence){
			this.setState(
				{showPopUp: true,
					popUpData: this.getAlreadySavedPopUpData()
				}
			)
		}
		else if (this.props.user_id) {
			this.props.dispatch(savePostToDashboard(this.props.post.id, this.props.user_id));
			this.setState(
				{
					showPopUp: true,
					popUpData: this.getConfirmationPopUpData()
				}
		)
		} else {
			this.setState(
				{showPopUp: true,
					popUpData: this.getLoginPopUpData()
				}
			)
		}
	}

	getConfirmationPopUpData() {
		return {
			text: "Фотосет успешно добавилен в Ваш профиль",
			leftButton: "Закрыть",
			rightButton: "Профиль",
			rightButtonNavigator: "/dashboard"
		}
	}

	getLoginPopUpData() {
		return {
			text: "Вы не авторизованы на сайте. Пожалуйста, авторизируйтесь.",
			leftButton: "Закрыть",
			rightButton: "Войти",
			rightButtonNavigator: "/login"
		}
	}
	getAlreadySavedPopUpData() {
		return {
			text: "Фотосет уже добавлен в Ваш профиль",
			leftButton: "Закрыть",
			rightButton: "Профиль",
			rightButtonNavigator: "/dashboard"
		}
	}
}
