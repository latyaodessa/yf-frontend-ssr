import React from 'react'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import {connect} from "react-redux";
import meta from "../src/components/posts/single/components/singlePostMetaGenerator"
import InitServiceView from './../src/components/service/create/InitServiceView';

class CreateService extends React.Component {
    //
    // static async getInitialProps({store, query}) {
    //
    //     // await store.dispatch(fetchPublicationDetails(query.link));
    //
    //     return {link: query}
    // }

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    render() {
        return (
            <MainLayoutWithNavigation meta={meta()}>
                <div>
                    <span>
                        Предлажите свои услуги
                    </span>
                </div>
                <InitServiceView/>
            </MainLayoutWithNavigation>

        )
    }
}

function mapStateToProps(state) {
    const {single} = state;
    return single;
}

export default connect(mapStateToProps)(CreateService);

