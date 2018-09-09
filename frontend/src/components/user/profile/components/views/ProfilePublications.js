import React from 'react'
import {connect} from 'react-redux'
import {getPublicationsByUser} from "../../../../../actions/post/post-actions";
import mainStyles from '../../../../../../res/styles/main.scss'
import dashboardStyles from '../../../../../../res/styles/user/dashboard.scss'
import {Link} from '../../../../../../routes'
import {getCookieByKey} from "../../../../../services/CookieService";
import {NO_PUBLICATION_PUBLISHED} from "../../../../../messages/profile";
import ThumbnailPicture from '../../../../posts/core/ThumbnailPicture'

const incrementSize = 12;
const initSizePhoto = 0;

class ProfilePublications extends React.Component {


    constructor(props) {
        super(props);
        // this.props.dispatch(fetchNativePosts(this.state.initSizePhoto, this.state.incrementSize));
        this.updateScroll = this.updateScroll.bind(this);

    }

    componentDidMount() {
        const user = getCookieByKey('user');

        if (!user) {
            return;
        }


        this.props.dispatch(getPublicationsByUser(user.id, initSizePhoto, incrementSize));

        this.setState({
            userId: user.id,
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
        this.props.dispatch(getPublicationsByUser(this.state.userId, this.state.initSizePhoto, currentPhotoSize));
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
                <ThumbnailPicture post={post}/>
            </div>
        )
    }

    renderContent = () => {
        if (this.props.fetched && this.props.post && this.props.post.length > 0) {
            return <div className="grid-list-container">
                <div className="pure-g">{this.renderPics(this.props.post)}</div>
            </div>
        }

        return this.getNoPubsInfo();


    };

    getNoPubsInfo() {
        return <h1 className="no-underscore">{NO_PUBLICATION_PUBLISHED}</h1>
    }

    getDummyWarning() {
        return <div style={{backgroundColor: "#ffffcc", borderRadius: "5px", padding: "15px"}}>
            <div><span>На данный момент предложить публикации возможно только через <a href={"https://vk.com/youngfolks"} target="_blank">публичную страницу в VK.</a></span></div>
            <div><span>В скором времени это возможно будет сделать тут</span></div>
        </div>
    }

    render() {
        return (
            <div>
                <style jsx>{mainStyles}</style>
                <style jsx>{dashboardStyles}</style>
                {this.getDummyWarning()}
                <div className="dashboard-container">
                    {this.props.fetched && this.renderContent()}


                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {native} = state;
    return native;
}

export default connect(mapStateToProps)(ProfilePublications)
