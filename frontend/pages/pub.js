import React from 'react'
import {fetchPublicationDetails} from "../src/actions/post/single-post-actions";
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import {connect} from "react-redux";
import PicsRenderer from "../src/components/posts/single/components/pics-renderer-component";
import StoragePicsRenderer from "../src/components/posts/single/components/storage-pics-renderer-component";
import Header from "../src/components/posts/single/components/header-component";
import RelatedPostsSliderComponent from "../src/components/posts/single/components/related-posts-component"
import Sidebar from '../src/components/core/sidebars/main-sidebar/sidebar'
import styles from "../res/styles/main.scss"
import meta from "../src/components/posts/single/components/singlePostMetaGenerator"
import ErrorPage from 'next/error'
import {RELATED_PUBS} from "../src/messages/post";

class SinglePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
        };
    }

    static async getInitialProps({store, query}) {
        await store.dispatch(fetchPublicationDetails(query.link));
        return {link: query.link}
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps() {
        this.setState({
            width: this.props.width,
            mobileViewSize: this.props.mobileViewSize
        })
    }


    renderPics = () => {
        if (this.props.post.vkPost) {
            return <PicsRenderer
                largePics={this.props.post.vkPost.largePics}/>
        }

        return <StoragePicsRenderer
            pics={this.props.post.publicationPictures}/>

    };


    render() {

        if (!this.props.post) {
            return <ErrorPage statusCode={404}/>
        }

        return (
            <MainLayoutWithNavigation meta={meta(this.props.post)}>
                <style jsx>{styles}</style>
                <div className="child-container">
                    <div className="wrapper">
                        <div className="content-wrapper">
                            <div className="content">
                                {this.props.fetched ?
                                    <div>
                                        <Header post={this.props.post} user_id={this.state.user_id}/>
                                        {this.renderPics()}
                                    </div>
                                    : null}
                            </div>
                        </div>
                        <Sidebar width={this.state.width} mobileViewSize={this.state.mobileViewSize}/>
                    </div>
                    <h1>{RELATED_PUBS}</h1>
                    {this.props.post ?
                        <RelatedPostsSliderComponent
                            publication={this.props.post}/>
                        : null}
                </div>
            </MainLayoutWithNavigation>

        )
    }
}

function mapStateToProps(state) {
    const {single} = state;
    return single;
}

export default connect(mapStateToProps)(SinglePost);

