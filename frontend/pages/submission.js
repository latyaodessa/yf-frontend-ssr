import React from 'react'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import {connect} from "react-redux";
import SubmissionViewsWrapper from "../src/components/submission/SubmissionViewsWrapper"
import {CANONICIAL_HOST_ROOT, CHARSET, DESCRIPTION_SBMT, KEYWORDS_SBMT, TITLE_SBMT} from "../src/messages/meta";

class Submission extends React.Component {

    constructor(props) {
        super(props);

    }

    static async getInitialProps({store, query}) {
        return {}
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    render() {
        return (
            <MainLayoutWithNavigation meta={getMeta()}>
                <SubmissionViewsWrapper/>
            </MainLayoutWithNavigation>

        )
    }
}

const getMeta = () => {
    return {
        title: TITLE_SBMT,
        description: DESCRIPTION_SBMT,
        canonical: CANONICIAL_HOST_ROOT + "submission",
        charset: CHARSET,
        keywords: KEYWORDS_SBMT
    };
};

function mapStateToProps(state) {
    const {single} = state;
    return single;
}

export default connect(mapStateToProps)(Submission);

