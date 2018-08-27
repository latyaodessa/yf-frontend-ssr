import React from 'react';
import {connect} from 'react-redux';
import {Link} from '../../../../../routes'
import Swiper from 'react-id-swiper';
import {getRelatedPosts} from '../../../../actions/post/single-post-actions';
import styles from "../../../../../res/styles/main.scss"
import slider from "../../../../../res/styles/slider.scss"
import singlePostStyle from "../../../../../res/styles/single-post.scss"
import selementsStyle from "../../../../../res/styles/common/elements.scss"
import LoaderForm from '../../../../components/core/form/LoaderForm'

class RelatedPostsSliderComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }


    }

    componentDidMount() {
        this.setState({loaded: false});
        console.log(this.props);
        this.props.dispatch(getRelatedPosts(this.props.publication)).then(() => {
            this.setState({loaded: true});
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.publication !== this.props.publication) {
            this.setState({loaded: false});
            this.props.dispatch(getRelatedPosts(this.props.publication)).then(() => {
                this.setState({loaded: true});
            });
        }
    }

    render() {


        console.log(this.props);

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
        return posts.map(post => <div key={post.id}>
                <style jsx>{styles}</style>
                <style jsx>{slider}</style>
                <style jsx>{selementsStyle}</style>
                {this.state && this.state.loaded ?
                    <div
                        className="hovereffect">
                        <Link route='pub' params={{link: post.link}}>
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
                    </div> :
                    <LoaderForm height={300}/>}
            </div>
        )
    }

}

function mapStateToProps(state) {
    const {related} = state;
    return related;
}


export default connect(mapStateToProps)(RelatedPostsSliderComponent);
