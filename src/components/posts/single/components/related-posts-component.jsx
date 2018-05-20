import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Swiper from 'react-id-swiper';
import {getRelatedPosts} from '../../../../actions/post/single-post-actions';

@connect((store) => {
	return {
		relatedPosts: store.related.posts,
		fetched: store.related.fetched
	}
})
export default class RelatedPostsSliderComponent extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch(getRelatedPosts(this.props.query, this.props.excludeId));
	}

	render() {
		const params = {
			slidesPerView: 3,
			paginationClickable: true,
			freeMode: true,
			loop: true
		};

		console.log(this.props);

		return (
				<div className="related-post-slider">
					{this.props.fetched ? <Swiper {...params}>
						{this.getSlides(this.props.relatedPosts)}
					</Swiper> : null}
				</div>
		);
	}

	getSlidesCount() {
		return this.props.relatedPosts.length >= 3 ? 3 : this.props.relatedPosts.length;
	}

	getSlides(posts) {
		return posts.map(post => <div key={post.id}
																	className="hovereffect">
				<Link to={ '/post/' + post.id }>
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
				</Link>
			</div>
		)
	}

}
