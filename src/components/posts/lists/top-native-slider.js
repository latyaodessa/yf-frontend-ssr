import React from 'react';
import Link from 'next/link'
import Swiper from 'react-id-swiper';
import {fetchTopNative} from '../../../actions/post/post-actions';
import {connect} from "react-redux";
import styles from "../../../../res/styles/index.scss"

class TopNativeSlider extends React.Component {

    static initialAction() {
        return fetchTopNative(0, 10);
    }

    constructor(props) {
        super(props);
        console.log("AAA");
        console.log(this.props);
        this.state = {
            fetched: this.props.fetched,
            post: this.props.post
        }
    }

    render() {
        const params = {
            slidesPerView: 3,
            paginationClickable: true,
            freeMode: true,
            loop: true
        };
        return (
            <div>
                <style jsx>{styles}</style>
                {this.state.fetched ? <Swiper {...params}>
                    {this.getSlides(this.state.post)}
                </Swiper> : null}
            </div>
        );
    }

    getSlides(posts) {
        return posts.map(post => <div key={post.id}
                                      className="hovereffect">
                <img className="slider-img" src={post.thumbnail}/>
                <Link href={'/post/' + post.id}>
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {topNative} = state;
    return topNative;
}

export default connect(mapStateToProps)(TopNativeSlider)
