import React from 'react'
import {connect} from 'react-redux'
import {deletePostFromDashboard, getSavedPosts} from '../../../../../actions/user/dashboard-actions';
import mainStyles from '../../../../../../res/styles/main.scss'
import dashboardStyles from '../../../../../../res/styles/user/dashboard.scss'
import elementsStyles from '../../../../../../res/styles/common/elements.scss'
import {Link} from '../../../../../../routes'
import {getCookieByKey} from "../../../../../services/CookieService";

const incrementSize = 12;
const initSizePhoto = 0;

class ProfilePublications extends React.Component {

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

    deltePostFromDashBoard(id, post_id, user_id) {
        this.props.dispatch(deletePostFromDashboard(id, post_id, user_id));
    }

    renderPics(posts) {
        return posts.map(post => <div key={post.id}
                                      className="pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-3">
            <style jsx>{mainStyles}</style>
            <style jsx>{dashboardStyles}</style>
            <style jsx>{elementsStyles}</style>
            <div className="grig-img-container hovereffect">
                <img className="grig-img" src={post.thumbnail}/>
                <div className="overlay">
                    <div className="tools-wrapper">
                        <div className="delete-container">
                            <img onClick={this.deltePostFromDashBoard.bind(this, post.id, post.post_id, post.user_id)}
                                 className="delete-button-img" src="/static/img/icons/close-button.png"/>
                        </div>
                    </div>
                    <Link to={'post/' + post.post_id}>
                        <div className="ul-main-list">
                            {post.md ? <ul className="md-white">
                                <li>{post.md}</li>
                            </ul> : null}
                            {post.ph ? <ul className="ph-white">
                                <li>{post.ph}</li>
                            </ul> : null}
                        </div>
                    </Link>
                </div>
            </div>
        </div>)
    }

    getNotExistSavedPostsNotification() {
        return <h1 className="no-underscore">Вы еще не сохранили ни одного фотосета</h1>
    }

    render() {
        return (
            <div>
                <style jsx>{mainStyles}</style>
                <style jsx>{dashboardStyles}</style>
                <div className="dashboard-container">
                    {this.props.fetched &&
                    <div className="pure-g">{this.renderPics(this.props.savedPosts)}</div>
                    }

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


export default connect(mapStateToProps)(ProfilePublications)
