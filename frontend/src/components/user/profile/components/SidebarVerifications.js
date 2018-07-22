import React from "react";
import {connect} from "react-redux";
import style from './sidebar-style.scss'
import {cleanUserCookies} from "../../../../services/CookieService";
import Router from "next/router";
import {EMAIL_VERIFICATION, EXIT, SAVE_CHANGES, VERIFICATION_TITLE} from "../../../../messages/profile";

const ARROW_UP = '/static/img/icons/up-arrow.png';
const ARROW_DOWN = '/static/img/icons/down-arrow.png';

class SidebarVerifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropDown: true
        }
    }

    changeDropDown = () => {
        this.setState({dropDown: !this.state.dropDown})
    };

    componentDidMount() {
    }

    logOut() {
        cleanUserCookies().then(() => {
            Router.push('/auth');
        });
    }

    editProfile = () => {
        this.props.editProfile();
    };

    render() {
        return (
            <div>
                <style jsx>{style}</style>
                {this.state && <div>
                    <div onClick={this.changeDropDown.bind(this)} className={"drop-down-title"}>
                        <div className={"left"}>
                            <h1>{VERIFICATION_TITLE}</h1>
                        </div>
                        <div className={"right"}>
                            <img src={this.state.dropDown ? ARROW_UP : ARROW_DOWN}/>
                        </div>
                    </div>
                    {this.state.dropDown && <div className='info'>
                        <ul>
                            <li className={"li-with-img"}>
                                <a>{EMAIL_VERIFICATION}</a>
                                <img src={'/static/img/icons/tick.png'}/>
                            </li>
                            <li className={"li-with-img"}>
                                <a>{EMAIL_VERIFICATION}</a>
                                <img src={'/static/img/icons/tick.png'}/>
                            </li>
                        </ul>
                    </div>}
                </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(SidebarVerifications)
