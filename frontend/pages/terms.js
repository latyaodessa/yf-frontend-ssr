import React from 'react'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import PublicationTerms from "../src/components/terms/PublicationTerms";
import {CANONICIAL_HOST_ROOT, CHARSET, DESCRIPTION_TERMS, KEYWORDS_TERMS, TITLE_TERMS} from "../src/messages/meta";

class Terms extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <MainLayoutWithNavigation meta={getMeta()}>
                <PublicationTerms/>
            </MainLayoutWithNavigation>

        )
    }
}

const getMeta = () => {
    return {
        title: TITLE_TERMS,
        description: DESCRIPTION_TERMS,
        canonical: CANONICIAL_HOST_ROOT + "terms",
        charset: CHARSET,
        keywords: KEYWORDS_TERMS
    };
};

export default Terms;

