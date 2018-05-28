import React from 'react';
import {Link} from '../../../../routes'
import {connect} from 'react-redux'
import {fetchSetsPosts} from '../../../actions/post/post-actions'
import Sidebar from '../../core/sidebars/main-sidebar/sidebar'
import styles from "../../../../res/styles/main.scss"
import loaderStyles from "../../../../res/styles/loader.scss"
import elementsStyles from "../../../../res/styles/common/elements.scss"


class SetsGrid extends React.Component {

    static initialAction() {
        return fetchSetsPosts(0, 6);
    }

    constructor(props) {
        super(props);
        this.state = {
            increment_size: 6,
            init_size: 0,
            from: 0,
            to: 6
        };
    }

    renderPics(posts) {
        return posts.map(post => <div key={post.id}
                                      className="pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-3 grig-img-container hovereffect">
            <style jsx>{styles}</style>
            <style jsx>{elementsStyles}</style>
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
        </div>)
    }

    fetchMorePosts() {
        let currentPhotoSize = this.state.to += this.state.increment_size;
        this.setState({
            to: currentPhotoSize
        });
        this.props.dispatch(fetchSetsPosts(this.state.from, this.state.to));

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
                                <h1>Зарубежные</h1>
                                <div className="pure-g">
                                    {this.renderPics(this.props.post)}
                                </div>
                                <div className="under-button">
                                    <a onClick={() => this.fetchMorePosts()}> <img src="/static/img/64/load-more.png"/></a>
                                </div>
                            </div>
                        </div>
                        <div style={{opacity: 0}}>
                            <Sidebar width={this.props.width} mobileViewSize={this.props.mobileViewSize}/>
                        </div>
                    </div>
                    : null
                }
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {sets} = state;
    return sets;
}

export default connect(mapStateToProps)(SetsGrid)
