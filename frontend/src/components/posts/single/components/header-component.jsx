import React from 'react';
import {connect} from 'react-redux';
import HeaderText from '../components/header-text-component';
import styles from "../../../../../res/styles/single-post.scss";
import SocialSharingButtons from './buttons/SocialSharingButtons';
import LikeButton from './buttons/LikeButton';
import componentsStyle from './buttons/style.scss'

class Header extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                <style jsx>{componentsStyle}</style>
                <div className="single-post-header">
                    <HeaderText post={this.props.post}/>
                    {/*<SavePostButton post={this.props.post}/>*/}
                </div>
                <div className={"button-bar"}>
                    <SocialSharingButtons/>
                    <LikeButton post={this.props.post}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(Header);
