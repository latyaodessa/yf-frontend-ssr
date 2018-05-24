import React from 'react'
import {connect} from 'react-redux'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import meta from '../src/components/home/components/homeMetaGenerator'
import {Link} from '../routes'
import {deletePostFromDashboard, getSavedPosts} from '../src/actions/user/dashboard-actions';
import HeaderUserDashboard from '../src/components/user/dashboard/components/header-user-dashboard-component';
import mainStyles from '../res/styles/main.scss'
import dashboardStyles from '../res/styles/user/dashboard.scss'
import elementsStyles from '../res/styles/common/elements.scss'

const incrementSize = 12;
const initSizePhoto = 0;

class UserDashboard extends React.Component {
    static async getInitialProps({store, isServer}) {

        // await Promise.all([].concat(Grid.initialAction()).map(async (action) => {
        //     await store.dispatch(action);
        // }));

        return {isServer}
    }


    constructor(props) {
        super(props);
        this.updateScroll = this.updateScroll.bind(this);
        this.isPostsExists = this.isPostsExists.bind(this);
    }

    componentDidMount() {
        const userId = localStorage.getItem("user_id");

        this.setState({
            currentPhotosLoaded: 12,
            userId: userId,
            visibleHeight: document.documentElement.clientHeight,
            pageHeight: document.documentElement.scrollHeight,
            currentScroll: document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
        });
        this.props.dispatch(getSavedPosts(userId, initSizePhoto, incrementSize));
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
                    <div className="delete-container">
                        <img onClick={this.deltePostFromDashBoard.bind(this, post.id, post.post_id, post.user_id)}
                             className="delete-button-img" src="/static/img/64/delete-button.png"/>
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
            <MainLayoutWithNavigation meta={meta()}>
                <div>
                    <style jsx>{mainStyles}</style>
                    <style jsx>{dashboardStyles}</style>
                    <div className="dashboard-container">
                        {typeof localStorage !== 'undefined' && <HeaderUserDashboard/>}
                        {this.props.fetched ?
                            <div className="pure-g">{this.renderPics(this.props.savedPosts)}</div> : null}

                        {this.isLoadMore.bind(this)}

                        {this.isPostsExists() ? <div className="under-button">
                                <a onClick={this.fetchMorePhotos.bind(this)}> <img src="/static/img/64/load-more.png"/></a>
                            </div>
                            : this.getNotExistSavedPostsNotification()}

                    </div>
                </div>
            </MainLayoutWithNavigation>
        )
    }
}

function mapStateToProps(state) {
    const {savedPosts} = state;
    return savedPosts;
}


export default connect(mapStateToProps)(UserDashboard)
