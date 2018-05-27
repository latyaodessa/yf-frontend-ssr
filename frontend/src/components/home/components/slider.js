import React from 'react'
import {connect} from 'react-redux'
import Swiper from 'react-id-swiper'
import {fetchTopSets, fetchTopNative} from '../../../actions/post/post-actions'

@connect((store) => {
	return {
		topNative: store.topNative.post,
		topNativePostFetched: store.topNative.fetched,
		topSets: store.topSets.post,
		topSetsPostFetched: store.topSets.fetched
	}
})
export default class Slider extends React.Component {

	componentWillMount() {
		this.props.dispatch(fetchTopSets(0, 5));
		this.props.dispatch(fetchTopNative(0, 5));
	}


	render() {

		if (this.props.topNativePostFetched === false || this.props.topSetsPostFetched === false) {
			return <div></div>;
		}

		const params = {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			spaceBetween: 30
			// mousewheelControl: true
		};

		return (<Swiper {...params}>
				{/*{this.getTopSetsSlides(this.props.topSets)}*/}
				<div><img src="https://pp.vk.me/c837734/v837734104/20526/IaIDZCocetM.jpg"></img></div>
				<div><img src="https://pp.vk.me/c837435/v837435893/24b7d/WKJi7mHKLLc.jpg"></img></div>
				<div><img src="https://pp.vk.me/c837734/v837734104/20526/IaIDZCocetM.jpg"></img></div>
				<div><img src="https://pp.vk.me/c837435/v837435893/24b7d/WKJi7mHKLLc.jpg"></img></div>
				<div><img src="https://pp.vk.me/c837734/v837734104/20526/IaIDZCocetM.jpg"></img></div>
				<div><img src="https://pp.vk.me/c837435/v837435893/24b7d/WKJi7mHKLLc.jpg"></img></div>

			</Swiper>
		);
	}

	getTopSetsSlides(posts) {
		return posts.map(post => <div className="grig-img-container" key={post.id}><img className="grig-img"
																																										src={post.thumbnail}/></div>)
	}

}
