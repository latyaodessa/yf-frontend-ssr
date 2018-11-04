import React from 'react'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import {connect} from "react-redux";
import meta from "../src/components/posts/single/components/singlePostMetaGenerator"
import SubmissionViewsWrapper from "../src/components/submission/SubmissionViewsWrapper"

class Submission extends React.Component {

    static async getInitialProps({store, query}) {
        return {}
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    render() {
        return (
            <MainLayoutWithNavigation meta={meta()}>
                <SubmissionViewsWrapper/>
            </MainLayoutWithNavigation>

        )
    }
}

function mapStateToProps(state) {
    const {single} = state;
    return single;
}

export default connect(mapStateToProps)(Submission);

