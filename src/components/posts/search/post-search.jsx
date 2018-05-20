import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {searchPosts} from "../../../actions/post/post-actions";

@connect((store) => {
  return {
    posts: store.searchPosts.posts,
    fetched: store.searchPosts.fetched
  }
})

export default class PostSearch extends React.Component {

  constructor(props) {
    super(props);
    const searchQuery = new URLSearchParams(props.location.search).get('query');
    this.setQueryState(searchQuery);
    if (searchQuery) {
      this.props.dispatch(searchPosts(searchQuery));
    }
  }

  componentDidMount() {
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
      this.state = {
        searchQuery: searchQuery,
        queryExist: true
      }
    } else {
      this.state = {
        searchQuery: "Может, имя модели или фотографа?",
        queryExist: false
      }
    }
  }

  regexCleaner(text) {
    return text.replace(/#.*s/, '').replace(/\[.*\|/, '').replace(/]/, '').replace(/http.*/, '');
  }

  renderPics(posts) {
    return posts.map(post => <div key={post.id}
                                  className="pure-u-1-1 pure-u-sm-1-1 pure-u-md-1-2 grig-img-container hovereffect">
      <img className="grig-img" src={post.thumbnail}/>
      <Link to={'post/' + post.id}>
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

  getForm() {
    return (
      <div id="wrap">
        <form action="">
          <input id="search" name="query" type="text" placeholder={this.state.searchQuery}
                 style={{fontSize: this.state.fontSize}}/>
          <input id="search_submit" type="submit"/>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="search-container" style={{"width": this.state.formWidth}}>
        {this.getForm()}
        {this.props.fetched ?
          <div className="pure-g">{this.renderPics(this.props.posts)}</div>
          : null}
        {this.props.fetched && this.props.posts.length === 0 ?
          <div className="nothing-found-container">
            <h1>Ничего не найдено</h1>
          </div>
          : null}
      </div>
    )
  }
}
