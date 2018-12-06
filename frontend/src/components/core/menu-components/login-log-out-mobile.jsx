import React from 'react'
import {connect} from 'react-redux';
import {logout} from '../../../actions/core/login-logout-actions';
import styles from '../../../../res/styles/navigation.scss'
import {Link} from '../../../../routes'
import {cleanUserCookies, verifyLoggedInUser} from "../../../services/CookieService";
import Router from "next/router";

class MobileLoginLogoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAuth: false,
            showDropDownMenu: false
        };
    }


    componentDidMount() {
        verifyLoggedInUser().then(valid => {
            this.setState({
                userAuth: valid
            });
        })
    }

    logOut() {
        cleanUserCookies().then(() => {
            Router.push('/auth');
        });
    }

    render() {
        return (
            <ul style={{padding: 0}}>
                {this.state.userAuth ? this.getLogoutButtonMobile()
                    : <li>{this.getLoginButton()}</li>
                }
            </ul>
        )
    }

    getLoginButton() {
        return <div>
            <style jsx>{styles}</style>
            <Link route='auth'><a>
                Войти</a>
            </Link>
        </div>

    }

    getLogoutButtonMobile() {
        return <div className="login-menu-container">
                <style jsx>{styles}</style>
                <ul>
                    <Link route='profile'>
                        <li>Профиль</li>
                    </Link>
                    <li><a onClick={this.logOut.bind(this)}>Выйти</a></li>
                </ul>
            </div>

    }

}

export default MobileLoginLogoutButton;



