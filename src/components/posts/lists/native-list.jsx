import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchNativePosts} from '../../../actions/post/post-actions';
import Loader from '../../core/loader';
// import DocumentMeta from 'react-document-meta';


@connect((store) => {
  return {
    nativePosts: store.native.post,
    fetched: store.native.fetched,
    fetching: store.native.fetching
  }
})
export default class NativeList extends React.Component {
  state = {
    incrementSize: 12,
    initSizePhoto: 0,
    currentPhotosLoaded: 12,
    visibleHeight: document.documentElement.clientHeight,
    pageHeight: document.documentElement.scrollHeight,
    currentScroll: document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
  };

  constructor(props) {
    super(props);
    this.props.dispatch(fetchNativePosts(this.state.initSizePhoto, this.state.incrementSize));
    this.updateScroll = this.updateScroll.bind(this);

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
    this.props.dispatch(fetchNativePosts(this.state.initSizePhoto, currentPhotoSize));
  }

  isLoadMore() {
    if (this.state.currentScroll >= this.state.pageHeight - this.state.visibleHeight) {
      return true;
    }
  }

  renderPics(posts) {
    return posts.map(post => <div key={post.id}
                                  className="pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-3 grig-img-container hovereffect">
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
          </div>
        </div>
      </Link>
    </div>)
  }


  render() {
    const meta = {
      title: "Young Folks - Модели с Украины России и других стран СНГ",
      description: "Young Folks - Модели с Украины России и других стран СНГ. Модельное Агенство для начинающих истории работа",
      canonical: "http://youngfolks.ru/native",
      meta: {
        charset: 'utf-8',
        name: {
          keywords: "Модели, модельное агентсво, young folks, модели и фотогафы из России Украины СНГ"
        }
      }
    };
    return (
      <div>
        {/*<DocumentMeta {...meta} />*/}
        <div className="grid-list-container">
          {this.props.fetched ? <div className="pure-g">{this.renderPics(this.props.nativePosts)}</div> : null}
        </div>
        {this.props.fetching ? <Loader/> : null}
      </div>
    )
  }
}


