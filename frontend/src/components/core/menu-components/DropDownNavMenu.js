import React from 'react'
import {Link} from '../../../../routes'
import {cleanUserCookies, verifyLoggedInUser} from "../../../services/CookieService";
import Router from "next/router";
import {LOGIN_DROPDOWN, EXIT_DROPDOWN, PROFILE_DROPDOWN} from '../../../messages/core'
import style from './styles.scss'

class DropDownNavMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userAuth: false,
            showDropDownMenu: false
        }

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

    getDropDownMenu = () => {
        return this.state.userAuth ? this.getMenuForAuthUser() : this.getMenuForNONAuhtUser();
    };

    getMenuForAuthUser = () => {
        return <ul className="dropdown-list">
            <style jsx>{style}</style>
            <li className="menu__list__item"><Link route='profile'><a>{PROFILE_DROPDOWN}</a></Link></li>
            <li className="menu__list__item" onClick={this.logOut.bind(this)}><a>{EXIT_DROPDOWN}</a></li>
        </ul>;
    };

    getMenuForNONAuhtUser = () => {
        return <ul className="dropdown-list">
            <style jsx>{style}</style>
            <li className="menu__list__item"><Link route='auth'><a>{LOGIN_DROPDOWN}</a></Link></li>
        </ul>;
    };

    showHideDropDownMenu = () => {
        this.setState({showDropDownMenu: !this.state.showDropDownMenu});
    };

    render() {
        return (<div onClick={this.showHideDropDownMenu.bind(this)}>
            <style jsx>{style}</style>
            <span className="dots">
            <div className="dot"/>
        </span>
            {this.state.showDropDownMenu && this.getDropDownMenu()}
        </div>)
    }


}


export default DropDownNavMenu;
