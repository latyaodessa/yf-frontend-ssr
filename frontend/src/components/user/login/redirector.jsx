import React from 'react';
import Router from 'next/router'
import {connect} from 'react-redux';
import {verifyLoggedInUser} from "../../../services/CookieService";

class Redirector extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        verifyLoggedInUser().then(valid => {
            if (valid) {
                Router.push('/profile');
            }
        })
    }


    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Redirector)
