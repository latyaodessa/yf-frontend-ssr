import React from 'react';
import {connect} from 'react-redux';
import {Link} from '../../../../../routes'
import Swiper from 'react-id-swiper';
import {getRelatedPosts} from '../../../../actions/post/single-post-actions';
import TopNativeSlider from "../../lists/top-native-slider";
import NativeGrid from "../../../home/components/native-grid-component";
import SetsGrid from "../../../home/components/sets-grid-component";
import styles from "../../../../../res/styles/main.scss"
import slider from "../../../../../res/styles/slider.scss"
import singlePostStyle from "../../../../../res/styles/single-post.scss"
import selementsStyle from "../../../../../res/styles/common/elements.scss"


class RelatedPostsSliderComponent extends React.Component {


    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log(this.props);
        this.props.dispatch(getRelatedPosts(this.props.query, this.props.excludeId));
    }

    render() {
        const params = {
            slidesPerView: 3,
            paginationClickable: true,
            freeMode: true,
            loop: true
        };

        return (
            <div className="related-post-slider">
                <style jsx>{styles}</style>
                <style jsx>{singlePostStyle}</style>
                {this.props.fetched ? <Swiper {...params}>
                    {this.getSlides(this.props.posts)}
                </Swiper> : null}
            </div>

        );
    }

    getSlidesCount() {
        return this.props.posts.length >= 3 ? 3 : this.props.posts.length;
    }

    getSlides(posts) {
        return posts.map(post => <div>
                <style jsx>{styles}</style>
                <style jsx>{slider}</style>
                <style jsx>{selementsStyle}</style>
                <div key={post.id}
                     className="hovereffect">
                    <Link route='post' params={{postId: post.id}}>
                        <div>
                            <img className="slider-img" src={post.thumbnail}/>
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
                        </div>
                    </Link>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    const {related} = state;
    return related;
}


export default connect(mapStateToProps)(RelatedPostsSliderComponent);
