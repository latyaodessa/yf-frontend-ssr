import React from 'react';
import {connect} from 'react-redux';
import {Link} from '../routes'
import {fetchExclusivePosts} from '../src/actions/post/post-actions';
import Loader from '../src/components/core/loader';
import MainLayoutWithNavigationSidebar from '../src/components/layouts/MainLayoutWithNavigationSidebar'
import TopNativeSlider from '../src/components/posts/lists/top-native-slider'
import styles from '../res/styles/main.scss'
import {getMetaData, POST_TYPE} from "../src/components/posts/lists/postsListMetaGenerator"
import ThumbnailPicture from '../src/components/posts/core/ThumbnailPicture'
import ThumbnailPictureWithoutText from '../src/components/posts/core/ThumbnailPictureWithoutText'
import {Button, Header, Icon} from 'semantic-ui-react'
import {SUBMIT_BUTTON} from "../src/messages/submission";
import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid";
const initSizePhoto = 0;
const incrementSize = 12;

class NativeList extends React.Component {


    constructor(props) {
        super(props);
        this.updateScroll = this.updateScroll.bind(this);
        this.state = {
            windowWidth: 0,
            gridColumnWidth: 0
        }
    }

    static async getInitialProps({store, isServer}) {


        await store.dispatch(fetchExclusivePosts(initSizePhoto, incrementSize));

        return {isServer}
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
        this.props.dispatch(fetchExclusivePosts(this.state.initSizePhoto, currentPhotoSize));
    }

    isLoadMore() {
        if (this.state.currentScroll >= this.state.pageHeight - this.state.visibleHeight) {
            return true;
        }
    }

    renderPics(posts) {
        return posts.slice(1).map((post, order) => {
                return <div key={post.id}
                            className="pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-3">
                    <ThumbnailPicture post={post}/>
                </div>

            }
        )
    }

    renderEmpty = () => {
        return <div>
            <Header as='h2' icon  textAlign='center' style={{padding:'50px'}}>
                <Icon name='hand peace outline' />
                Привет, рубрика "эксклюзив" находится на стадии подготовки.
                <Header.Subheader>Хочешь попасть в эсклюзив? Приисылай нам твои работы, если они не были ранее нигде опубликованы.</Header.Subheader>
                <Link route='submission'>
                    <a><Button style={{margin: '20px', background: '#3b9c9a'}}
                        content={SUBMIT_BUTTON}
                        primary/>
                    </a>
                </Link>
            </Header>
        </div>
    }


    render() {
        return (
            <MainLayoutWithNavigationSidebar meta={getMetaData(POST_TYPE.EXCLUSIVE)} slider={TopNativeSlider}>
                <style jsx>{styles}</style>

                {this.props.post && this.props.post.length > 0 ? <div>
                        <ThumbnailPictureWithoutText post={this.props.post[0]}/>
                        <div className="grid-list-container">
                            {this.renderPics(this.props.post)}
                        </div>
                    </div> :
                    this.renderEmpty()
                }


                {this.props.fetching ? <Loader/> : null}
            </MainLayoutWithNavigationSidebar>
        )
    }
}

const inlineStyles = {
    titleSpan: {
        fontSize: "2rem",
        color: "#2b2b2b",
        textTransform: "none",
        fontFamily: "'Philosopher', sans-serif",
        textAlign: "center",
        padding: "0 5px 5px 5px"
    },
    textContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        textAlign: "center",
        transform: "translate(-50%, -50%)"
    },
    firstPostSecondBlockMobile: {
        background: "#FFF",
        top: "-70px",
        position: "relative",
        cursor: "pointer",
        borderRadius: "40px",
        opacity: "0.9"
    }

};

function mapStateToProps(state) {
    const {exclusiveList} = state;
    return exclusiveList;
}

export default connect(mapStateToProps)(NativeList)

