import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {deletePostFromDashboard, getSavedPosts} from '../../../actions/user/dashboard-actions';
import LoadMoreImg from '../../../res/img/64/load-more.png';
import HeaderUserDashboard from './components/header-user-dashboard-component';
import DeleteButtonImg from '../../../res/img/64/delete-button.png';


@connect((store) => {
  return {
    savedPosts: store.savedPosts.savedPosts,
    savedPostsFetched: store.savedPosts.fetched,
    deletePost: store.deletePost
  }
})
export default class UserDashboard extends React.Component {

  state = {
    incrementSize: 12,
    initSizePhoto: 0,
    currentPhotosLoaded: 12,
    userId: localStorage.getItem("user_id"),
    visibleHeight: document.documentElement.clientHeight,
    pageHeight: document.documentElement.scrollHeight,
    currentScroll: document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
  };

  constructor(props) {
    super(props);
    this.props.dispatch(getSavedPosts(this.state.userId, this.state.initSizePhoto, this.state.incrementSize));
    this.updateScroll = this.updateScroll.bind(this);
    this.isPostsExists = this.isPostsExists.bind(this);
  }

  componentDidMount() {
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
    this.props.dispatch(getSavedPosts(this.state.userId, this.state.initSizePhoto, currentPhotoSize));
  }

  isLoadMore() {
    if (this.state.currentScroll >= this.state.pageHeight - this.state.visibleHeight) {
      return true;
    }
  }

  isPostsExists() {
    return this.props.savedPostsFetched && this.props.savedPosts.length !== 0;
  }

  deltePostFromDashBoard(id, post_id, user_id) {
    this.props.dispatch(deletePostFromDashboard(id, post_id, user_id));
  }

  renderPics(posts) {
    return posts.map(post => <div key={post.id}
                                  className="pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-3 grig-img-container hovereffect">
      <img className="grig-img" src={post.thumbnail}/>
      <div className="overlay">
        <div className="delete-container">
          <img onClick={this.deltePostFromDashBoard.bind(this, post.id, post.post_id, post.user_id)}
               className="delete-button-img" src={DeleteButtonImg}/>
        </div>
        <Link to={'post/' + post.post_id}>
          <div className="ul-main-list">
            {post.md ? <ul className="md-white">
              <li>{post.md}</li>
            </ul> : null}
            {post.ph ? <ul className="ph-white">
              <li>{post.ph}</li>
            </ul> : null}
          </div>
        </Link>
      </div>
    </div>)
  }

  getNotExistSavedPostsNotification() {
    return <h1 className="no-underscore">Вы еще не сохранили ни одного фотосета</h1>
  }

  render() {
    const meta = {
      title: "Профайл пользователя. Young Folks - Модели с Америки и Европы России",
      description: "Young Folks - Модели с Америки и Европы России Модельное Агенство для начинающих истории работа",
      canonical: "http://youngfolks.ru/dashboard",
      meta: {
        charset: 'utf-8',
        name: {
          keywords: "Модели, модельное агентсво, young folks, модели и фотогафы из Европы США Америка"
        }
      }
    };

    return (
      <div className="dashboard-container">
        {/*<DocumentMeta {...meta} />*/}
        <HeaderUserDashboard/>
        {this.props.savedPostsFetched ? <div className="pure-g">{this.renderPics(this.props.savedPosts)}</div> : null}

        {this.isLoadMore.bind(this)}

        {this.isPostsExists() ? <div className="under-button">
            <a onClick={this.fetchMorePhotos.bind(this)}> <img src={LoadMoreImg}/></a>
          </div>
          : this.getNotExistSavedPostsNotification()}

      </div>
    )
  }
}
