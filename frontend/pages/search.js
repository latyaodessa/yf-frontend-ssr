import React from 'react'
import {connect} from 'react-redux'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import styles from '../res/styles/search-post.scss'
import {searchPosts} from "../src/actions/post/post-actions";
import {Link} from '../routes'
import meta from '../src/components/posts/searchMetaGenerator'
import elementsStyles from '../res/styles/common/elements.scss'


class PostSearch extends React.Component {
    constructor(props) {
        super(props);

    }

    static async getInitialProps({store, isServer}) {
        return {isServer}
    }

    componentDidMount() {
        const searchQuery = new URLSearchParams(location.search).get('query');
        this.setQueryState(searchQuery);
        if (searchQuery) {
            this.props.dispatch(searchPosts(searchQuery));
        }
        this.setScreenWidth();
    }

    setScreenWidth() {
        if (window.innerWidth > 1160) {
            this.setState({
                formWidth: 1160 + "px",
                fontSize: 55 + "px"
            })
        } else {
            this.setState({
                formWidth: window.innerWidth - 10 + "px",
                fontSize: 20 + "px"
            })
        }
    }

    setQueryState(searchQuery) {
        if (searchQuery) {
            this.setState({
                searchQuery: searchQuery,
                queryExist: true
            });
        } else {
            this.setState({
                searchQuery: "Может, имя модели или фотографа?",
                queryExist: false
            });
        }
    }

    regexCleaner(text) {
        return text.replace(/#.*s/, '').replace(/\[.*\|/, '').replace(/]/, '').replace(/http.*/, '');
    }

    renderPics(posts) {
        return posts.map(post => <div key={post.id}
                                      className="pure-u-1-1 pure-u-sm-1-1 pure-u-md-1-2 grig-img-container hovereffect">
            <style jsx>{elementsStyles}</style>
            <img className="grig-img" src={post.thumbnail}/>
            <Link route='pub' params={{link: post.link}}>
                <div className="overlay">
                    <div className="ul-main-list">
                        {post.md ? <ul className="md-white">
                            <li>{post.md}</li>
                        </ul> : null}
                        {post.ph ? <ul className="ph-white">
                            <li>{post.ph}</li>
                        </ul> : null}
                        {!post.ph && !post.md ? <ul className="md-white">
                            <li>{this.regexCleaner(post.text)}</li>
                        </ul> : null}
                    </div>
                </div>
            </Link>
        </div>)
    }

    render() {
        let searchQuery = this.state ? this.state.searchQuery : "";
        return (
            <MainLayoutWithNavigation meta={meta(searchQuery)}>
                <style jsx>{styles}</style>
                {this.state ? <div className="search-container" style={{"width": this.state.formWidth}}>
                    <div id="wrap">
                        <form action="">
                            <input id="search" name="query" type="text" placeholder={this.state.searchQuery}
                                   style={{fontSize: this.state.fontSize}}/>
                            <input id="search_submit" type="submit"/>
                        </form>
                    </div>
                    {this.props.fetched ?
                        <div className="pure-g">{this.renderPics(this.props.posts)}</div>
                        : null}
                    {this.props.fetched && this.props.posts.length === 0 ?
                        <div className="nothing-found-container">
                            <h1>Ничего не найдено</h1>
                        </div>
                        : null}
                </div> : null}
            </MainLayoutWithNavigation>

        )
    }
}

function mapStateToProps(state) {
    const {searchPosts} = state;
    return searchPosts;
}


export default connect(mapStateToProps)(PostSearch)
