import React from 'react'
import {connect} from 'react-redux'
import ProfileSidebar from './components/ProfileSidebar'
import ProfileMainContent from './components/ProfileMainContent'

class ProfilePage extends React.Component {

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
            <div>
                <div className="pure-g">
                    <div style={style.container}>
                        <div className="pure-u-1 pure-u-md-6-24 pure-u-sm-9-24">
                            <ProfileSidebar/>
                        </div>
                        <div className="pure-u-1 pure-u-md-18-24 pure-u-sm-15-24">
                            <ProfileMainContent/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(ProfilePage)

const style = {
    container: {
        margin: 'auto',
        maxWidth: '1500px'
    }
};
