import React from 'react';
import Router from 'next/router'
import {connect} from 'react-redux';


class Redirector extends React.Component {

    constructor(props) {
        super(props);

    }



    componentDidMount() {
        if (localStorage.getItem('user_id')) {
            Router.push('/dashboard');
        }
    }


    render() {
        return null;
    }
}

function mapStateToProps(state) {

    if (typeof localStorage !== 'undefined' && localStorage.getItem('user_id')) {
        Router.push('/dashboard');
    }
    return state;
}

export default connect(mapStateToProps)(Redirector)
