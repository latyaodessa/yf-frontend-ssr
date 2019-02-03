import React from 'react';
import {connect} from 'react-redux';
import Swiper from 'react-id-swiper';
import {fetchExclusivePosts} from '../../../../../actions/post/post-actions';
import styles from "../../../../../../res/styles/main.scss";
import {Link} from '../../../../../../routes'
import ThumbnailPictureWithoutText from '../../../../posts/core/ThumbnailPictureWithoutText'

class ExclustivePostsThumbnailSlider extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 0,
            posts: null
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchExclusivePosts(0, 5)).then(() => {
            let posts = this.props.post;
            shuffle(posts);
            this.setState({posts});
        });
    }

    render() {
        const params = {
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            }
        };

        return (
            <div style={inlineStyle.sticky}>
                {this.props.fetched && this.state.posts && <div style={inlineStyle.slider}>
                    <Swiper {...params}>
                        {this.getSlides(this.state.posts)}
                    </Swiper>

                </div>}


            </div>

        );

    }

    getSlides(posts) {
        return posts.map(post => <div key={post.id}>
                {/*<ThumbnailPicture post={post}/>*/}
                {this.renderPic(post)}
            </div>
        )
    }

    renderPic = (firstPost) => {
        return <div>
            <style jsx>{styles}</style>
            <div>
                <ThumbnailPictureWithoutText customStyles={inlineStyle} post={firstPost}/>
            </div>
        </div>
    };

}


const inlineStyle = {
    slider: {
        width: "300px",
        padding: "10px"
    },
    textSpan: {
        fontSize: "2rem",
        color: "#FFF",
        textTransform: "none",
        fontFamily: "'Philosopher', sans-serif"
    },
    sticky: {
        // position: "fixed",
        // bottom: 0
    }
};

function mapStateToProps(state) {
    const {exclusiveList} = state;
    return exclusiveList;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


export default connect(mapStateToProps)(ExclustivePostsThumbnailSlider);
