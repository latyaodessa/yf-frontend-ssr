import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import DeleteButtonImg from '../../../../res/img/64/delete-button.png';

export default class GridPicsUserDashboard extends React.Component {

	renderPics(posts) {
		return posts.map(post => <div key={post.id}
																	className="pure-u-1-2 pure-u-sm-1-2 pure-u-md-1-3 grig-img-container hovereffect">
			<img className="grig-img" src={post.thumbnail}/>
			<Link to={ 'post/' + post.post_id }>
				<div className="overlay">
					<div className="delete-container">
						<img className="delete-button-img" src={DeleteButtonImg}/>
					</div>
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
		return (
			<div>
				{this.props.savedPostsFetched ? <div className="pure-g">{this.renderPics(this.props.savedPosts)}</div> : null}
				{/*{this.isLoadMore.bind(this)}*/}
			</div>
		)
	}
}
