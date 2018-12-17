import React from 'react';
import {fetchNativePosts} from '../../../actions/post/post-actions'
import {connect} from 'react-redux';
import styles from "../../../../res/styles/main.scss"
import loaderStyles from "../../../../res/styles/loader.scss"
import {Link} from '../../../../routes'
import ThumbnailPicture from '../../posts/core/ThumbnailPicture'


import Sidebar from '../../core/sidebars/main-sidebar/sidebar'

class NativeGrid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            increment_size: 6,
            init_size: 0,
            from: 0,
            to: 6
        };
    }

    static initialAction() {
        return fetchNativePosts(0, 6);
    }

    renderPics(posts) {
        return posts.map(post => <div key={post.id}
                                      className="pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-3">
            <ThumbnailPicture post={post}/>
        </div>)
    }

    fetchMorePosts(type) {
        let currentPhotoSize = this.state.to += this.state.increment_size;
        this.setState({
            to: currentPhotoSize
        });

        this.props.dispatch(fetchNativePosts(this.state.from, this.state.to));

    }


    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                <style jsx>{loaderStyles}</style>
                {this.props.fetched ?
                    <div className="wrapper">
                        <div className="content-wrapper">
                            <div className="content">
                                <h1>Наши</h1>
                                <div className="pure-g">
                                    {this.renderPics(this.props.post)}
                                </div>
                                <div className="under-button">
                                    <a onClick={() => this.fetchMorePosts()}>
                                        <img src="/static/img/icons/refresh-black.png"/></a>
                                </div>
                            </div>
                        </div>
                        <Sidebar width={this.props.width} mobileViewSize={this.props.mobileViewSize}/>
                    </div>
                    : null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {native} = state;
    return native;
}

export default connect(mapStateToProps)(NativeGrid)
