import React from 'react';
import {connect} from 'react-redux';
import styles from "../../../../../res/styles/single-post.scss"
import MessagesModalWindow, {MESSAGE_TYPES} from '../../../core/modal/MessagesModalWindow'
import {SubmitButton} from '../../../core/form/buttons/Button'
import {getCookieByKey, verifyLoggedInUser} from "../../../../services/CookieService";
import {SAVE_SET_NOT_AUTHORIZED, SAVE_SET_TITLE, SIGN_IN_FROM_TITLE} from '../../../../messages/auth/auth'
import {SET_ALREADY_SAVED} from '../../../../messages/post'

import {LimitedLabel} from "../../../core/form/labels/LimitedLabel"
import Router from "next/router";
import {isPostAlreadySavedByUser} from "../../../../actions/post/single-post-actions";
import {savePostToDashboard} from "../../../../actions/user/dashboard-actions";

class SavePostButton extends React.Component {

    constructor(props) {
        super(props);
        this.showClosePopup = this.showClosePopup.bind(this);

    }


    componentDidMount() {
        this.checkIsPostAlreadySavedByUser();

        this.setState({
            showPopUp: false,
            userId: '',
            error: '',
            errorMessage: '',
            fetching: false,
            saved: false
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.post !== this.props.post) {
            this.setState({
                showPopUp: false,
                userId: '',
                error: '',
                errorMessage: '',
                fetching: false,
                saved: false
            });
            this.checkIsPostAlreadySavedByUser();
        }
    }

    checkIsPostAlreadySavedByUser() {
        verifyLoggedInUser().then(valid => {
            if (valid) {
                this.setState({
                    userId: getCookieByKey('user').id
                });
                this.props.dispatch(isPostAlreadySavedByUser(this.props.post.id, getCookieByKey('user').id)).then(() => {
                    this.setState({saved: this.props.postExistenceByUser.existence});
                });

            }
        });
    }


    showClosePopup() {
        this.setState({
            showPopUp: false
        })
    }


    savePost() {
        if (this.state.saved) {
            return;
        }
        if (!this.state.userId) {
            this.setState({showPopUp: true, error: MESSAGE_TYPES.WARNING, errorMessage: SAVE_SET_NOT_AUTHORIZED});
            return;
        }

        this.props.dispatch(savePostToDashboard(this.props.post.id, this.state.userId)).then(() => {
            this.setState({saved: true});
        });

    }

    handleSubmit = (evt) => {
        this.setState({fetching: true});
        evt.preventDefault();
        if (this.state.errorMessage === SAVE_SET_NOT_AUTHORIZED) {
            Router.push('/auth');
        }

    };

    render() {
        return (
            <div className={"align-to-right"}>
                <style jsx>{styles}</style>
                <div className="button-container">
                    <div className="save-button-icon">
                        {this.state && this.state.saved ?
                            <img src="/static/img/64/post_saved.png" onClick={this.savePost.bind(this)}/> :
                            <img src="/static/img/64/save_post.png" onClick={this.savePost.bind(this)}/>}
                    </div>
                    {this.state && this.state.saved && <span>{SET_ALREADY_SAVED}</span>}

                </div>
                {this.state && <MessagesModalWindow
                    handleSubmit={this.handleSubmit}
                    showPopUp={this.state.showPopUp}
                    close={() => this.setState({showPopUp: false})}
                    popupTitle={SAVE_SET_TITLE}
                    type={this.state.error}>
                    <LimitedLabel label={this.state.errorMessage}/>
                    <SubmitButton title={SIGN_IN_FROM_TITLE} fetching={this.state.fetching}/>
                </MessagesModalWindow>}
            </div>
        )
    }
}


function mapStateToProps(state) {
    const {postExistenceByUser, single, savePost} = state;
    return {postExistenceByUser: postExistenceByUser, single: single, savePost: savePost};
}


export default connect(mapStateToProps)(SavePostButton);
