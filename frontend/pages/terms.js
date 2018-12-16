import React from 'react'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import meta from "../src/components/posts/single/components/singlePostMetaGenerator"
import PublicationTerms from "../src/components/terms/PublicationTerms"

class Terms extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <MainLayoutWithNavigation meta={meta()}>
                <PublicationTerms/>
            </MainLayoutWithNavigation>

        )
    }
}

export default Terms;

