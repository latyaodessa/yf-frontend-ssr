import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Swiper from 'react-id-swiper';
import {fetchTopSets} from '../../../actions/post/post-actions';

@connect((store) => {
    return {
        topSets: store.topSets.post,
        topSetsPostFetched: store.topSets.fetched,
    }
})
export default class TopSetsSlider extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch(fetchTopSets(0, 10));
    }

    render() {
        const params = {
            // pagination: '.swiper-pagination',
            slidesPerView: 3,
            paginationClickable: true,
            freeMode: true,
            loop: true
        };

        return (
            <div>
                {this.props.topSetsPostFetched ? <Swiper {...params}>
                    {this.getSlides(this.props.topSets)}
                </Swiper> : null}
            </div>
        );
    }

    getSlides(posts) {
        return posts.map(post => <div key={post.id}
                                      className="hovereffect">
                <img className="slider-img" src={post.thumbnail}/>
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
            </div>
        )
    }

}
