import React from 'react';
import {connect} from 'react-redux';
import {Link} from '../routes'
import {fetchArtPosts} from '../src/actions/post/post-actions';
import Loader from '../src/components/core/loader';
import MainLayoutWithNavigationSidebar from '../src/components/layouts/MainLayoutWithNavigationSidebar'
import {getMetaData, POST_TYPE} from "../src/components/posts/lists/postsListMetaGenerator"
import ThumbnailPicture from '../src/components/posts/core/ThumbnailPicture'


const initSizePhoto = 0;
const incrementSize = 12;

class NativeList extends React.Component {


    static async getInitialProps({store, isServer}) {

        await store.dispatch(fetchArtPosts(initSizePhoto, incrementSize));

        return {isServer}
    }


    constructor(props) {
        super(props);
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
        });
        if (this.isLoadMore()) {
            this.fetchMorePhotos();
        }
    }

    fetchMorePhotos() {
        let currentPhotoSize = this.state.currentPhotosLoaded += this.state.incrementSize;
        this.setState({
            currentPhotosLoaded: currentPhotoSize
        });
        this.props.dispatch(fetchArtPosts(this.state.initSizePhoto, currentPhotoSize));
    }

    isLoadMore() {
        if (this.state.currentScroll >= this.state.pageHeight - this.state.visibleHeight) {
            return true;
        }
    }


    renderPics(posts) {
        return posts.map(post => <div key={post.id}
                                      className="pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-3">
            <ThumbnailPicture post={post}/>
        </div>)
    }


    render() {
        return (
            <MainLayoutWithNavigationSidebar meta={getMetaData(POST_TYPE.ART)}>
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
    const {art} = state;
    return art;
}

export default connect(mapStateToProps)(NativeList)

