import React from 'react';
import Router from 'next/router'
import {connect} from 'react-redux';

// @connect((store) => {
//   return {
//     registered_user: store.user,
//     vk_user: store.vk,
//     fb_user: store.facebook
//   }
// })
class Redirector extends React.Component {

    constructor(props) {
        super(props);

    }

    // isRegisteredUser(nextProps) {
    //     return nextProps.registered_user.user && nextProps.registered_user.fetched;
    // }
    //
    // isVkUserCreated(nextProps) {
    //     return nextProps.vk_user.user && nextProps.vk_user.fetched;
    // }
    //
    // isFbUserCreated(nextProps) {
    //     return nextProps.fb_user.user && nextProps.fb_user.fetched;
    // }

    componentDidMount() {
        if (localStorage.getItem('user_id')) {
            Router.push('/dashboard');
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //
    //
    //     if (this.isRegisteredUser(nextProps) || this.isVkUserCreated(nextProps) || this.isFbUserCreated(nextProps)) {
    //         Router.push('/dashboard');
    //     }
    // }

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
