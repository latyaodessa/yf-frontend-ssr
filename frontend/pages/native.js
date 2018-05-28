import React from 'react';
import {connect} from 'react-redux';
import {Link} from '../routes'
import {fetchNativePosts} from '../src/actions/post/post-actions';
import Loader from '../src/components/core/loader';
import MainLayoutWithNavigationSidebar from '../src/components/layouts/MainLayoutWithNavigationSidebar'
import TopNativeSlider from '../src/components/posts/lists/top-native-slider'
import styles from '../res/styles/main.scss'
import elementsStyles from '../res/styles/common/elements.scss'
import {getMetaData, POST_TYPE} from "../src/components/posts/lists/postsListMetaGenerator"

const initSizePhoto = 0;
const incrementSize = 12;

class NativeList extends React.Component {


    static async getInitialProps({store, isServer}) {


        await store.dispatch(fetchNativePosts(initSizePhoto, incrementSize));
        await store.dispatch(TopNativeSlider.initialAction());

        return {isServer}
    }


    constructor(props) {
        super(props);
        // this.props.dispatch(fetchNativePosts(this.state.initSizePhoto, this.state.incrementSize));
        this.updateScroll = this.updateScroll.bind(this);

    }

    componentDidMount() {
        this.setState({
            initSizePhoto: initSizePhoto,
            incrementSize: incrementSize,
            currentPhotosLoaded: 12,
            visibleHeight: document.documentElement.clientHeight,
            pageHeight: document.documentElement.scrollHeight,
            currentScroll: document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
        });
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
        })
        if (this.isLoadMore()) {
            this.fetchMorePhotos();
        }
    }

    fetchMorePhotos() {
        let currentPhotoSize = this.state.currentPhotosLoaded += this.state.incrementSize;
        this.setState({
            currentPhotosLoaded: currentPhotoSize
        })
        this.props.dispatch(fetchNativePosts(this.state.initSizePhoto, currentPhotoSize));
    }

    isLoadMore() {
        if (this.state.currentScroll >= this.state.pageHeight - this.state.visibleHeight) {
            return true;
        }
    }

    renderPics(posts) {
        return posts.map(post =>
            <div key={post.id}
                 className="pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-3 ">
                <style jsx>{styles}</style>
                <style jsx>{elementsStyles}</style>
                <div className="grig-img-container hovereffect">

                    <img className="grig-img" src={post.thumbnail}/>
                    <Link route='post' params={{postId: post.id}}>
                        <a>
                            <div className="overlay">
                                <div className="ul-main-list">
                                    {post.md ? <ul className="md-white">
                                        <li>{post.md}</li>
                                    </ul> : null}
                                    {post.ph ? <ul className="ph-white">
                                        <li>{post.ph}</li>
                                    </ul> : null}
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        )
    }


    render() {
        return (
            <MainLayoutWithNavigationSidebar meta={getMetaData(POST_TYPE.NATIVE)} slider={TopNativeSlider}>
                <style jsx>{styles}</style>
                <div className="grid-list-container">
                    {this.props.fetched ?
                        <div className="pure-g">{this.renderPics(this.props.post)}</div> : null}
                </div>
                {this.props.fetching ? <Loader/> : null}
            </MainLayoutWithNavigationSidebar>
        )
    }
}

function mapStateToProps(state) {
    const {topNative, native} = state;
    return native;
}

export default connect(mapStateToProps)(NativeList)

