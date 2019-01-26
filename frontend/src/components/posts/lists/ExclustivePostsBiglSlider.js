import React from 'react';
import {connect} from 'react-redux';
import Swiper from 'react-id-swiper';
import {fetchExclusivePosts} from '../../../actions/post/post-actions';
import ThumbnailPictureWithoutText from '../../posts/core/ThumbnailPictureWithoutText'
import styles from "../../../../res/styles/main.scss";
import {Link} from '../../../../routes'
import WindowSizeListener from 'react-window-size-listener'

class ExclustivePostsBigSlider extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 0
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchExclusivePosts(0, 5));
    }

    render() {
        console.log(this.props);
        const params = {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        };

        return (
            <div>
                {this.props.fetched && this.props.post.length > 0 && <WindowSizeListener
                    onResize={(windowSize) =>
                        this.setState({windowWidth: windowSize.windowWidth})}>
                    <div style={{width: this.state.windowWidth}}>
                        <Swiper {...params}>
                            {this.getSlides(this.props.post)}
                        </Swiper>

                    </div>
                </WindowSizeListener>}


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
                <ThumbnailPictureWithoutText post={firstPost}/>
            </div>
        </div>
    };

}

function mapStateToProps(state) {
    const {exclusiveList} = state;
    return exclusiveList;
}


export default connect(mapStateToProps)(ExclustivePostsBigSlider);
