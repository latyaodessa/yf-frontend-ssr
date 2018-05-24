import React from 'react';
import {connect} from 'react-redux';
import {savePostToDashboard} from "../../../../actions/user/dashboard-actions";
// import SavePostIcon from "../../../../res/img/64/save_post.png";
// import PostSavedIcon from "../../../../res/img/64/post_saved.png";
import PopUp from "./buttons/confirmation-popup-component"
import styles from "../../../../../res/styles/single-post.scss"


// @connect((store) => {
// 	return {
// 		savedPost: store.savePost.fetched
// 	}
// })
class SavePostButton extends React.Component {

    constructor(props) {
        super(props);
        this.showClosePopup = this.showClosePopup.bind(this);

    }

    componentDidMount() {
        this.setState({
            showPopUp: false,
            popUpData: ""
        });
    }

    showClosePopup() {
        this.setState({
            showPopUp: false
        })
    }


    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                <div className="button-container">
                    {this.state && this.state.showPopUp ?
                        <PopUp popupHandler={this.showClosePopup} popUpData={this.state.popUpData}/>
                        : null}
                    <div className="save-button-icon">
                        {this.props.postExistenceByUser.existence ?
                            <img src="/static/img/64/post_saved.png" onClick={this.savePost.bind(this)}/> :
                            <img src="/static/img/64/save_post.png" onClick={this.savePost.bind(this)}/>}
                    </div>
                </div>
            </div>
        )
    }


    savePost() {
        const userId = localStorage.getItem('user_id');
        if (this.props.postExistenceByUser.existence) {
            this.setState(
                {
                    showPopUp: true,
                    popUpData: this.getAlreadySavedPopUpData()
                }
            )
        }
        else if (userId) {
            this.props.dispatch(savePostToDashboard(this.props.post.id, userId));
            this.setState(
                {
                    showPopUp: true,
                    popUpData: this.getConfirmationPopUpData()
                }
            )
        } else {
            this.setState(
                {
                    showPopUp: true,
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


function mapStateToProps(state) {
    console.log("AAAA");
    console.log(state);
    return state;
}


export default connect(mapStateToProps)(SavePostButton);
