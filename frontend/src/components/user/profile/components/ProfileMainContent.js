import React from 'react'
import {connect} from 'react-redux'
import styles from '../style.scss'
import {ProfileMainContentNavigation} from './ProfileMainContentNavigation'
import ProfileSavedPosts from './views/ProfileSavedPosts';

class ProfileMainContent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const userId = localStorage.getItem("user_id");

        this.setState({
            userId: userId
        });
    }


    render() {
        return (
            <div className="container-wrapper">
                <style jsx>{styles}</style>
                <ProfileMainContentNavigation/>
                <ProfileSavedPosts/>
                {/*<div className="box">*/}
                {/*<div className="box-title">@Johnny has added new triangles</div>*/}
                {/*<div className="box-body">Three sides.</div>*/}
                {/*</div>*/}

                {/*<div className="box">*/}
                {/*<div className="box-title">@Johnny has added new triangles</div>*/}
                {/*<div className="box-body">Three sides.</div>*/}
                {/*</div>*/}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(ProfileMainContent)

