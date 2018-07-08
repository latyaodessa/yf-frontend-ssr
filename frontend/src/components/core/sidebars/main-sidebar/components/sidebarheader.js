import React from 'react'
import {Link} from '../../../../../../routes'
import Router from 'next/router'
import styles from '../../../../../../res/styles/sidebar.scss'
import loginStyles from '../../../../../../res/styles/user/login.scss'
import {verifyLoggedInUser, cleanUserCookies, getCookieByKey} from "../../../../../services/CookieService";


class SidebarHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userAuth: false,
            fetched: false
        }

    }

    componentDidMount() {
        verifyLoggedInUser().then(valid => {
            this.setState({
                userAuth: valid,
                fetched: true
            });
        })

    }

    getUserName() {
        let user = getCookieByKey('user');
        return [user.firstName, user.lastName].join(" ");
    }


    getLoggedInUserData() {
        return <div>
            <style jsx>{styles}</style>
            <div className="sidebar-header">
                {/*<Link route='dashboard'><img className='avatar' src={this.getUserThumbnail()}/></Link>*/}
                <div className="sidebar-header-text">
                    <h1 className="no-underscore">{this.getUserName()}</h1>
                </div>
            </div>
            <div className='info'>
                <ul>
                    <li>
                        <Link route='profile'><a>Профайл</a></Link>
                    </li>
                    <li>
                        <a onClick={this.logOut.bind(this)}>Выйти</a>
                    </li>
                </ul>
            </div>
        </div>
    }

    navigateToLogin() {
        Router.push('/auth');
    }

    logOut() {
        cleanUserCookies();
        Router.push('/auth');
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
                {this.state.fetched && <div>
                    {this.state.userAuth ? this.getLoggedInUserData()
                        : this.getButton()}
                </div>}
            </div>
        )
    }
}


export default SidebarHeader;
