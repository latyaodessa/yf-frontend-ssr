import React from 'react';
import {connect} from 'react-redux';
import {fetchPostPictures} from "../../../actions/post/single-post-actions";
import PicsRenderer from "./components/pics-renderer-component";
import Header from "./components/header-component";
import RelatedPostsSliderComponent from "../../posts/single/components/related-posts-component"
import Sidebar from '../../core/sidebars/main-sidebar/sidebar'
// import DocumentMeta from 'react-document-meta';


@connect((store) => {
  return {
    post: store.single.post,
    singlePostFethced: store.single.fetched
  }
})
export default class SinglePost extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.props.dispatch(fetchPostPictures(this.props.match.params.postId));
    this.state = {
      user_id: localStorage.getItem("user_id"),
      postId: this.props.match.params.postId,
      width: "",
      mobileViewSize: ""

    };

    this.getTitle = this.getTitle.bind(this);
    this.getCanonical = this.getCanonical.bind(this);
    this.getKeywords = this.getKeywords.bind(this);
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    if (this.props.match.params.postId !== this.state.postId) {
      this.handleUpdatePostFromRelative();
    }

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

  getTitle() {
    if (this.props.post) {
      var md = this.props.post.md;
      var ph = this.props.post.ph;
      return ["Модель", md, "Фотограф", ph, "-", "Young Folks"].join(" ");
    }
  }

  getCanonical() {
    if (this.props.post) {
      return "http://youngfolks.ru/post" + this.props.post.id
    }
  }

  getKeywords() {
    if (this.props.post) {
      var md = this.props.post.md;
      var ph = this.props.post.ph;
      return [md, ph, "Модели", "Фотографы", "Россия", "Украина", "Модельное Агентство"].join(", ")
    }
  }


  render() {

    const meta = {
      title: this.getTitle(),
      description: this.getTitle() + 'Модельное агентство.Модели и фотографы из Украины, России, Европы, США',
      canonical: this.getCanonical(),
      meta: {
        charset: 'utf-8',
        name: {
          keywords: this.getKeywords()
        }
      }
    };

    return (
      <div className="child-container">
        {/*<DocumentMeta {...meta} />*/}
        <div className="wrapper">
          <div className="content-wrapper">
            <div className="content">
              {this.props.singlePostFethced ?
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
            excludeId={this.props.match.params.postId}
            query={[this.props.post.md, this.props.post.ph].join(" ")}/>
          : null}
      </div>
    )
  }
}



