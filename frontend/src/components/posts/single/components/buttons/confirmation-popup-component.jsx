import React from 'react';
import {Link} from '../../../../../../routes';
import styles from "../../../../../../res/styles/popup.scss"

export default class ConfirmationPopUp extends React.Component {

    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                <div className="popup">
                    <p>{this.props.popUpData.text}</p>
                    <ul>
                        <li>
                            <a className="button-popup" onClick={this.props.popupHandler}>
                                {this.props.popUpData.leftButton}
                            </a>
                        </li>
                        <li>
                            <Link
                                route={this.props.popUpData.rightButtonNavigator}><a
                                className="button-popup">{this.props.popUpData.rightButton}</a></Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
