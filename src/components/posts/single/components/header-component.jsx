import React from 'react';
import {connect} from 'react-redux';
import SavePostButton from '../components/save-post-button';
import HeaderText from '../components/header-text-component';
import {isPostAlreadySavedByUser} from "../../../../actions/post/single-post-actions";
import styles from "../../../../../res/styles/single-post.scss"

// @connect((store) => {
// 	return {
// 		existence: store.postExistenceByUser.existence
// 	}
// })


class Header extends React.Component {
    constructor(props) {
        super(props);
        // this.checkIsPostAlreadySavedByUser = this.checkIsPostAlreadySavedByUser.bind(this);

    }

    componentDidMount() {
        this.checkIsPostAlreadySavedByUser();
    }

    checkIsPostAlreadySavedByUser() {
        const userId = localStorage.getItem('user_id');
        if (userId) {
            this.props.dispatch(isPostAlreadySavedByUser(this.props.post.id, userId))
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

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(Header);
