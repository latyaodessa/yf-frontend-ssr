import React from 'react'
import {fetchPostPictures} from "../src/actions/post/single-post-actions";
import {connect} from "react-redux";
import ErrorPage from 'next/error';

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

