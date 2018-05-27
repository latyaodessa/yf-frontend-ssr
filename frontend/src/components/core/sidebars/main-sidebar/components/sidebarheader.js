import React from 'react'
import {Link} from '../../../../../../routes'
import Router from 'next/router'
import styles from '../../../../../../res/styles/sidebar.scss'
import loginStyles from '../../../../../../res/styles/user/login.scss'


class SidebarHeader extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.setState({
            userExist: localStorage.getItem('user_id') ? true : false
        });
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
                <Link route='dashboard'><img className='avatar' src={this.getUserThumbnail()}/></Link>
                <div className="sidebar-header-text">
                    <h1 className="no-underscore">{this.getUserName()}</h1>
                </div>
            </div>
            <div className='info'>
                <ul>
                    <li>
                        <Link route='dashboard'><a>Профайл</a></Link>
                    </li>
                    <li>
                        <a onClick={this.logOut.bind(this)}>Выйти</a>
                    </li>
                </ul>
            </div>
        </div>
    }

    navigateToLogin() {
        Router.push('/login');
    }

    logOut() {
        localStorage.clear();
        Router.push('/login');
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
                {this.state && this.state.userExist ? this.getLoggedInUserData()
                    : this.getButton()}
            </div>
        )
    }
}


export default SidebarHeader;
