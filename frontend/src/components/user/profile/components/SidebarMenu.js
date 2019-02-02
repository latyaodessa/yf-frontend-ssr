import React from "react";
import {connect} from "react-redux";
import style from './sidebar-style.scss'
import {cleanUserCookies} from "../../../../services/CookieService";
import Router from "next/router";
import {EDIT_PROFILE, EXIT, SAVE_CHANGES, SUBMISSION} from "../../../../messages/profile";
import {Link} from './../../../../../routes';

class SidebarMenu extends React.Component {

    constructor(props) {
        super(props);
    }

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
                <div className='info'>
                    <ul>
                        <li>
                            {this.props && this.props.edit ?
                                <a onClick={this.editProfile.bind(this)}>{SAVE_CHANGES}</a>
                                :
                                <a onClick={this.editProfile.bind(this)}>{EDIT_PROFILE}</a>
                            }

                        </li>
                        <li>
                            <Link route={'submission'}><a>{SUBMISSION}</a></Link>
                        </li>
                        <li>
                            <a onClick={this.logOut.bind(this)}>{EXIT}</a>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(SidebarMenu)
