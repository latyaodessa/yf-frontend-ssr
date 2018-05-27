import React from 'react'
import {connect} from 'react-redux';
import Link from 'next/link'
import {logout} from '../../../actions/core/login-logout-actions';
import styles from '../../../../res/styles/navigation.scss'

// @connect((store) => {
// 	return {
// 		loginLogout: store.loginLogout
// 	}
// })
class MobileLoginLogoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isUserLoggedIn: localStorage.getItem('user_id') ? true : false,
            showDropDownMenu: false
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.loginLogout.executed) {
            this.state = {
                isUserLoggedIn: nextProps.loginLogout.isLogin ? true : false
            };
        }
    }

    logOut() {
        localStorage.clear();
        this.props.dispatch(logout());
        this.props.history.push('/login');
    }

    render() {
        if (!this.state.isUserLoggedIn) {
            return (
                <li>{this.getLoginButton()}</li>
            )
        } else {
            return (
                <ul>{this.getLogoutButtonMobile()}</ul>
            )
        }
    }

    getLoginButton() {
        return <div>
            <style jsx>{styles}</style>
            <Link href="/login">
                Войти
            </Link>
        </div>
    }

    getLogoutButtonMobile() {
        return <div>
            <style jsx>{styles}</style>

            <div className="login-menu-container">
                <Link href="/dashboard">
                    <li>Профайл</li>
                </Link>
                <li><a onClick={this.logOut.bind(this)}>Выйти</a></li>
            </div>
        </div>
    }

}

export default MobileLoginLogoutButton;



