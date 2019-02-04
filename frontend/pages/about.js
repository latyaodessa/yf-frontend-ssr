import React from 'react'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import PublicationTerms from "../src/components/terms/PublicationTerms";
import {CANONICIAL_HOST_ROOT, CHARSET, DESCRIPTION_TERMS, KEYWORDS_TERMS, TITLE_TERMS} from "../src/messages/meta";

class About extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <MainLayoutWithNavigation meta={getMeta()}>
                <p style={inlineStyle.container}>
                    We are Young Folks, based in Austria, Vienna. We see potential in you and we want to share your talent with the whole world.
                    Feel free to join us.
                    editor@youngfolks.ru
                </p>
            </MainLayoutWithNavigation>

        )
    }
}

const inlineStyle = {
    container: {
        width: "300px",
        textAlign: 'center'
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

export default About;

