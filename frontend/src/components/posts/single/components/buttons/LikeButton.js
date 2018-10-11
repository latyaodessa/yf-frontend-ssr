import React from 'react';
import {connect} from 'react-redux';
import styles from './style.scss';
import MessagesModalWindow, {MESSAGE_TYPES} from '../../../../core/modal/MessagesModalWindow'
import {SubmitButton} from '../../../../core/form/buttons/Button'
import {getCookieByKey, verifyLoggedInUser} from "../../../../../services/CookieService";
import {SAVE_SET_NOT_AUTHORIZED, SAVE_SET_TITLE, SIGN_IN_FROM_TITLE} from '../../../../../messages/auth/auth'

import {LimitedLabel} from "../../../../core/form/labels/LimitedLabel"
import Router from "next/router";
import {isPostAlreadySavedByUser} from "../../../../../actions/post/single-post-actions";
import {deletePostFromDashboard, savePostToDashboard} from "../../../../../actions/user/dashboard-actions";
import LoadingSpinner from '../../../../core/loaders/LoadingSpinner'


const LIKE_BW = "/static/img/icons/like_bw.png";
const LIKE_COLOR = "/static/img/icons/like_color.png";

class LikeButton extends React.Component {

    constructor(props) {
        super(props);
        this.showClosePopup = this.showClosePopup.bind(this);
    }


    showClosePopup() {
        this.setState({
            showPopUp: false
        })
    }

    componentDidMount() {
        let vkLikes = this.props.post.vkPost ? this.props.post.vkPost.likes : 0;

        this.setState({
            showPopUp: false,
            userId: '',
            error: '',
            errorMessage: '',
            fetching: false,
            loading: false,
            savedId: '',
            likes: this.props.post.likes + vkLikes
        });
        this.checkIsPostAlreadySavedByUser();


    }

    componentDidUpdate(prevProps) {
        if (prevProps.post !== this.props.post) {

            let vkLikes = this.props.post.vkPost ? this.props.post.vkPost.likes : 0;

            this.setState({
                showPopUp: false,
                userId: '',
                error: '',
                errorMessage: '',
                fetching: false,
                loading: false,
                savedId: '',
                likes: this.props.post.likes + vkLikes
            })
            ;
            this.checkIsPostAlreadySavedByUser();
        }
    }

    checkIsPostAlreadySavedByUser() {
        this.setState({loading: true});
        verifyLoggedInUser().then(valid => {
            if (valid) {
                this.setState({
                    userId: getCookieByKey('user').id
                });
                this.props.dispatch(isPostAlreadySavedByUser(this.props.post.id, getCookieByKey('user').id)).then(() => {
                    this.setState({savedId: this.props.postExistenceByUser.existence.id});
                    this.setState({loading: false});
                });

            } else {
                this.setState({loading: false});
            }
        });
    }

    savePost() {


        if (!this.state.userId) {
            this.setState({showPopUp: true, error: MESSAGE_TYPES.WARNING, errorMessage: SAVE_SET_NOT_AUTHORIZED})
            return;
        }
        this.setState({loading: true});

        this.props.dispatch(savePostToDashboard(this.props.post.id)).then(() => {

            this.setState({
                savedId: this.props.savePost.saved.data.id,
                loading: false,
                likes: this.state.likes + 1
            });
        });

    }

    deletePublication = () => {

        this.setState({loading: true});

        if (!this.state.userId) {
            this.setState({showPopUp: true, error: MESSAGE_TYPES.WARNING, errorMessage: SAVE_SET_NOT_AUTHORIZED});
            return;
        }


        this.props.dispatch(deletePostFromDashboard(this.state.savedId)).then(() => {
            this.setState({
                savedId: '',
                loading: false,
                likes: this.state.likes - 1
            });

        });


    };

    handleSubmit = (evt) => {
        this.setState({fetching: true});
        evt.preventDefault();
        if (this.state.errorMessage === SAVE_SET_NOT_AUTHORIZED) {
            Router.push('/auth');
        }

    };

    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                {this.state && !this.state.loading ? <div className={"like-button-container"}>
                        {this.state.savedId ?
                            <img src={LIKE_COLOR} onClick={this.deletePublication.bind(this)}/>
                            : <img src={LIKE_BW} onClick={this.savePost.bind(this)}/>}
                        <div className={"number"}>
                            <span>{this.state.likes}</span>
                        </div>
                    </div> :
                    <LoadingSpinner/>
                }


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
    const {postExistenceByUser, single, savePost, deletePost} = state;
    return {
        postExistenceByUser: postExistenceByUser,
        single: single,
        savePost: savePost,
        deletePost: deletePost
    };
}


export default connect(mapStateToProps)(LikeButton);
