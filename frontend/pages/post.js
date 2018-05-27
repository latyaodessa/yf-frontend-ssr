import React from 'react'
import {fetchPostPictures} from "../src/actions/post/single-post-actions";
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import {connect} from "react-redux";
import PicsRenderer from "../src/components/posts/single/components/pics-renderer-component";
import Header from "../src/components/posts/single/components/header-component";
import RelatedPostsSliderComponent from "../src/components/posts/single/components/related-posts-component"
import Sidebar from '../src/components/core/sidebars/main-sidebar/sidebar'
import styles from "../res/styles/main.scss"
import meta from "../src/components/posts/single/components/singlePostMetaGenerator"

class SinglePost extends React.Component {

    static async getInitialProps({store, query}) {

        await store.dispatch(fetchPostPictures(query.postId));

        return {postId: query.postId}
    }

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleUpdatePostFromRelative() {
        window.scrollTo(0, 0);
        this.props.dispatch(fetchPostPictures(this.props.match.params.postId));
        this.setState({
            postId: this.props.match.params.postId
        })
    }

    componentWillReceiveProps() {
        this.setState({
            width: this.props.width,
            mobileViewSize: this.props.mobileViewSize
        })
    }


    render() {
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
                                        <PicsRenderer largePics={this.props.post.largePics}/>

                                    </div>
                                    : null}
                            </div>
                        </div>
                        <Sidebar width={this.state.width} mobileViewSize={this.state.mobileViewSize}/>
                    </div>
                    <h1>Похожие фотосеты</h1>
                    {this.props.post ?
                        <RelatedPostsSliderComponent
                            excludeId={this.props.post.id}
                            query={[this.props.post.md, this.props.post.ph].join(" ")}/>
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

