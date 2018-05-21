import React from 'react';
import {connect} from 'react-redux';
import SavePostButton from '../components/save-post-button';
import HeaderText from '../components/header-text-component';
import {isPostAlreadySavedByUser} from "../../../../actions/post/single-post-actions";

// @connect((store) => {
// 	return {
// 		existence: store.postExistenceByUser.existence
// 	}
// })

import styles from "../../../../../res/styles/single-post.scss"


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        // this.checkIsPostAlreadySavedByUser = this.checkIsPostAlreadySavedByUser.bind(this);

    }

    componentDidUpdate() {
        this.checkIsPostAlreadySavedByUser();
    }

    checkIsPostAlreadySavedByUser() {
        if (this.props.user_id) {
            this.props.dispatch(isPostAlreadySavedByUser(this.props.post.id, this.props.user_id))
        }
    }

    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                <div className="single-post-header">
                    <HeaderText post={this.props.post}/>
                    <SavePostButton checkPostSavedHandler={this.checkIsPostAlreadySavedByUser}
                                    user_id={this.props.user_id} existence={this.props.existence}
                                    post={this.props.post}/>
                </div>
            </div>
        )
    }
}
