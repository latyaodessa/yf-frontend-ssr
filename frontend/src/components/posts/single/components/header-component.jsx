import React from 'react';
import {connect} from 'react-redux';
import SavePostButton from '../components/save-post-button';
import HeaderText from '../components/header-text-component';
import styles from "../../../../../res/styles/single-post.scss"


class Header extends React.Component {
    constructor(props) {
        super(props);

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
