import React from 'react'
import Link from 'next/link'
import {ART_PAGE, MAIN_PAGE, NATIVE_PAGE, SETS_PAGE, EXCLUSIVE_PAGE} from '../../messages/core'
import MobileLoginLogoutButton from '../core/menu-components/login-log-out-mobile'
import styles from '../../../res/styles/navigation.scss'
import {Icon} from "semantic-ui-react";

export default class MobileMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMobileMenu: false,
            toggle: 'hamburger'
        };
    }

    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                <div className="mobile-menu">
                    {this.getButton()}
                    {this.state.showMobileMenu ? this.getMobileMenu() : null}
                </div>
            </div>
        )
    }

    getButton() {
        return <button onClick={this.changeToggleState.bind(this)} className={this.state.toggle}>
            <style jsx>{styles}</style>
            <span className="burger"/>
            <span className="burger"/>
            <span className="burger"/>
        </button>
    }

    getMobileMenu() {
        return <div>
            <style jsx>{styles}</style>
            <div className="menu-expanded">
                <nav>
                    <ul>
                        <li onClick={this.changeToggleState.bind(this)}>
                            <Link href='/'><a className="active">{MAIN_PAGE}</a></Link>
                        </li>
                        <li onClick={this.changeToggleState.bind(this)}>
                            <Link href='/exclusive'><a>
                                <Icon name='star'/>
                                {EXCLUSIVE_PAGE}
                            </a></Link>
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
                                <Link href='/search'><a><img src={"/static/img/icons/search-white.png"}/></a></Link>
                            </div>
                        </li>
                        <li className="last-li" onClick={this.changeToggleState.bind(this)}>
                            <MobileLoginLogoutButton/>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    }

    changeToggleState() {
        this.setState({
            showMobileMenu: !this.state.showMobileMenu,
            toggle: !this.state.showMobileMenu === false ? 'hamburger' : 'hamburger focus'
        });
    }
}
