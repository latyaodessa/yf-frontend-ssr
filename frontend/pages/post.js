import React from 'react'
import {fetchPostPictures} from "../src/actions/post/single-post-actions";
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import {connect} from "react-redux";
import meta from "../src/components/posts/single/components/singlePostMetaGenerator"

class SinglePost extends React.Component {

    static async getInitialProps({res, store, query}) {

        // await store.dispatch(fetchPostPictures(query.postId));
        let data = await fetchPostPictures(query.postId);

        if (data) {
            console.log(data);
            res.redirect(301, "/pub/" + data.link);
        } else {
            res.statusCode = 404;
        }



        // return { data };
    }

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
        };
    }

    componentDidMount() {
        console.log(this.props);
        window.scrollTo(0, 0);
    }


    render() {
        return (
            <MainLayoutWithNavigation meta={meta(this.props.post)}>

            </MainLayoutWithNavigation>

        )
    }
}

function mapStateToProps(state) {
    const {single} = state;
    return single;
}

export default connect(mapStateToProps)(SinglePost);

