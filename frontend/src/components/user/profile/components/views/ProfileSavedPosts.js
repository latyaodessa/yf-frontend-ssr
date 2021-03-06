import React from 'react'
import {connect} from 'react-redux'
import {deletePostFromDashboard, getSavedPosts} from '../../../../../actions/user/dashboard-actions';
import mainStyles from '../../../../../../res/styles/main.scss'
import dashboardStyles from '../../../../../../res/styles/user/dashboard.scss'
import {Link} from '../../../../../../routes'
import {getCookieByKey} from "../../../../../services/CookieService";
import {NO_PUBLICATION_SAVED} from "../../../../../messages/profile";
import ThumbnailPicture from '../../../../posts/core/ThumbnailPicture'

const incrementSize = 12;
const initSizePhoto = 0;

class ProfileSavedPosts extends React.Component {

    constructor(props) {
        super(props);
        this.updateScroll = this.updateScroll.bind(this);
        this.isPostsExists = this.isPostsExists.bind(this);
    }

    componentDidMount() {
        const user = getCookieByKey('user');

        if (!user) {
            return;
        }

        this.setState({
            currentPhotosLoaded: 12,
            userId: user.id,
            visibleHeight: document.documentElement.clientHeight,
            pageHeight: document.documentElement.scrollHeight,
            currentScroll: document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
        });
        this.props.dispatch(getSavedPosts(user.id, initSizePhoto, incrementSize));
        window.addEventListener("scroll", this.updateScroll);
    }


    componentWillUnmount() {
        window.removeEventListener("scroll", this.updateScroll);
    }

    updateScroll() {
        this.setState({
            visibleHeight: document.documentElement.clientHeight,
            pageHeight: document.documentElement.scrollHeight,
            currentScroll: document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
        });
        if (this.isLoadMore()) {
            this.fetchMorePhotos();
        }
    }

    fetchMorePhotos() {
        let currentPhotoSize = this.state.currentPhotosLoaded += incrementSize;
        this.setState({
            currentPhotosLoaded: currentPhotoSize
        });
        this.props.dispatch(getSavedPosts(this.state.userId, initSizePhoto, currentPhotoSize));
    }

    isLoadMore() {
        if (this.state.currentScroll >= this.state.pageHeight - this.state.visibleHeight) {
            return true;
        }
    }

    isPostsExists() {
        return this.props.fetched && this.props.savedPosts.length !== 0;
    }

    deltePostFromDashBoard(id) {
        this.props.dispatch(deletePostFromDashboard(id)).then(() => {
            location.reload(); // TODO content reload
        });
    }

    deleteComponent(post) {
        return <div className="tools-wrapper">
            <style jsx>{dashboardStyles}</style>
            <div className="delete-container">
                <img
                    onClick={this.deltePostFromDashBoard.bind(this, post.id)}
                    className="delete-button-img" src={"/static/img/icons/close-button.png"}/>
            </div>
        </div>
    }

    renderPics(posts) {
        return posts.filter(post => post).map(post => <div key={post.id}
                                                           className="pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-3">
            <ThumbnailPicture post={post.dto}>
                {this.deleteComponent(post)}
            </ThumbnailPicture>
        </div>)
    }

    getNotExistSavedPostsNotification() {
        return <h1 className="no-underscore">{NO_PUBLICATION_SAVED}</h1>
    }

    renderContent = () => {
        console.log(this.props.savedPosts);
        if (this.props.savedPosts && this.props.savedPosts.length > 0) {
            return <div className="pure-g">{this.renderPics(this.props.savedPosts)}</div>;
        }
        return this.getNotExistSavedPostsNotification();
    };

    render() {
        return (
            <div>
                <style jsx>{mainStyles}</style>
                <style jsx>{dashboardStyles}</style>
                <div className="dashboard-container">
                    {this.props.fetched && this.renderContent()}

                    {/*{this.isLoadMore.bind(this)}*/}

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {savedPosts} = state;
    return savedPosts;
}


export default connect(mapStateToProps)(ProfileSavedPosts)
