import React from 'react';
import dashboardStyles from '../../../../../res/styles/user/dashboard.scss'

export default class HeaderUserDashboard extends React.Component {


    getUserThumbnail() {
        return localStorage.getItem('user_thumbnail');
    }

    getUserName() {
        return [localStorage.getItem('user_first_name'), localStorage.getItem('user_last_name')].join(" ");
    }

    render() {
        return (
            <div>
                <style jsx>{dashboardStyles}</style>
                <div className="dashboard-header">
                    <div className="pure-g">
                        <div className="pure-u-1 pure-u-md-1-1">
                            <div className="inner-container">
                                <img className='avatar' src={this.getUserThumbnail()}/>
                                <h1 className="no-underscore">{this.getUserName()}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
