import React from 'react'
import Link from 'next/link'
import {ART_PAGE, MAIN_PAGE, NATIVE_PAGE, SETS_PAGE} from '../../messages/core'
// import MobileLoginLogoutButton from '../core/menu-components/login-log-out-mobile'
import styles from '../../../res/styles/navigation.scss'

export default class MobileMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMobileMenu: false,
            toggle: 'hamburger'
        };
    }

    render() {
        var mobileMenu = this.state.showMobileMenu ? this.getMobileMenu() : '';
        return (
            <div className="mobile-menu">
                {this.getButton()}
                {mobileMenu}
            </div>
        )
    }

    getButton() {
        return <button onClick={this.changeToggleState.bind(this)} className={this.state.toggle}>
            <span className="burger"/>
            <span className="burger"/>
            <span className="burger"/>
        </button>
    }

    getMobileMenu() {
        return <div className="menu-expanded">
            <style jsx>{styles}</style>
            <nav>
                <ul>
                    <li onClick={this.changeToggleState.bind(this)}>
                        <Link href='/'><a className="active">{MAIN_PAGE}</a></Link>
                    </li>
                    <li onClick={this.changeToggleState.bind(this)}>
                        <Link href='/native'><a className="active">{NATIVE_PAGE}</a></Link>
                    </li>
                    <li onClick={this.changeToggleState.bind(this)}>
                        <Link href='/sets'><a className="active">{SETS_PAGE}</a></Link>
                    </li>
                    <li onClick={this.changeToggleState.bind(this)}>
                        <Link href='/art'><a className="active">{ART_PAGE}</a></Link>
                    </li>
                    <li>
                        <div className="search-icon">
                            <Link to="/search"> <img src="/static/img/64/search-icon.png"/> </Link>
                        </div>
                    </li>
                    <li className="last-li" onClick={this.changeToggleState.bind(this)}>
                        {/*<MobileLoginLogoutButton/>*/}
                    </li>
                </ul>
            </nav>
        </div>
    }

    changeToggleState() {
        this.setState({
            showMobileMenu: !this.state.showMobileMenu,
            toggle: !this.state.showMobileMenu == false ? 'hamburger' : 'hamburger focus'
        });
    }
}
