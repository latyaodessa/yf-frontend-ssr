import React from 'react'
import Link from 'next/link'
import styles from '../../../../../../res/styles/sidebar.scss'
import loginStyles from '../../../../../../res/styles/user/login.scss'


class SidebarHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // userExist: localStorage.getItem('user_id') ? true : false
        }
    }

    getUserThumbnail() {
        return localStorage.getItem('user_thumbnail');
    }

    getUserName() {
        return [localStorage.getItem('user_first_name'), localStorage.getItem('user_last_name')].join(" ");
    }


    getLoggedInUserData() {
        return <div>
            <style jsx>{styles}</style>
            <div className="sidebar-header">
                <Link href="/dashboard"><img className='avatar' src={this.getUserThumbnail()}/></Link>
                <div className="sidebar-header-text">
                    <h1 className="no-underscore">{this.getUserName()}</h1>
                </div>
            </div>
            <div className='info'>
                <ul>
                    <li>
                        <Link href="/dashboard">Профайл</Link>
                    </li>
                    <li>
                        <a onClick={this.logOut.bind(this)}>Выйти</a>
                    </li>
                </ul>
            </div>
        </div>
    }

    navigateToLogin() {
        this.props.history.push('/login');
    }

    logOut() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    getButton() {
        return <div>
            <style jsx>{styles}</style>
            <style jsx>{loginStyles}</style>
            <a className="button yf" role="button" onClick={this.navigateToLogin.bind(this)}>
                <span>Войти</span>
                <div className="icon">
                    <img src="/static/img/32/YF-white.png"/>
                </div>
            </a>
        </div>
    }

    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                {this.state.userExist ? this.getLoggedInUserData()
                    : this.getButton()}
            </div>
        )
    }
}

export default SidebarHeader;
