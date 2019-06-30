import React from 'react'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import {CANONICIAL_HOST_ROOT, CHARSET, DESCRIPTION_TERMS, KEYWORDS_TERMS, TITLE_TERMS} from "../src/messages/meta";
import BookingSearchPanel from './../src/components/booking/components/BookingSearchPanel';
import BookingResultList from './../src/components/booking/list/BookingsResultList';

export const BookingContext = React.createContext({});

class BookingProvider extends React.Component {
    render() {
        return <BookingContext.Provider value={{test: "AAA"}}>
            {this.props.children}
        </BookingContext.Provider>
    }
}

class BookingPage extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <MainLayoutWithNavigation meta={getMeta()}>
                <BookingProvider>
                    <BookingSearchPanel/>
                    <BookingResultList />
                </BookingProvider>
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

export default BookingPage;

