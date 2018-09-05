import React from 'react'
import {fetchPostPictures} from "../src/actions/post/single-post-actions";
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import {connect} from "react-redux";
import meta from "../src/components/posts/single/components/singlePostMetaGenerator";
import ErrorPage from 'next/error';
import Router from 'next/router';

class SinglePost extends React.Component {

    static async getInitialProps({res, store, query}) {

        let data = await fetchPostPictures(query.postId);

        if (data) {
            res.redirect(301, "/pub/" + data.link);
        } else {
            res.statusCode = 404;
        }
        return {statusCode: res.statusCode, data};
    }


    render() {
        console.log(this.props.statusCode)
        if (this.props.statusCode && this.props.statusCode !== 200) {
            return <ErrorPage statusCode={this.props.statusCode}/>
        }
        return <div/>
    }
}

function mapStateToProps(state) {
    const {single} = state;
    return single;
}

export default connect(mapStateToProps)(SinglePost);

