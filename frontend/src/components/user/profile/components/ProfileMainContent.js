import React from 'react'
import {connect} from 'react-redux'
import styles from '../style.scss'
import {ProfileMainContentNavigation} from './ProfileMainContentNavigation'
import ProfileSavedPosts from './views/ProfileSavedPosts'
import ProfilePublications from './views/ProfilePublications'

export const SAVED_POST_PAGE = "saved";
export const PUBLISHED_PAGE = "published";
export const FOLLOWING_PAGE = "following";

class ProfileMainContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: SAVED_POST_PAGE
        };
        this.switchActivePage = this.switchActivePage.bind(this);
    }

    componentDidMount() {
        const userId = localStorage.getItem("user_id");
        this.setState({
            userId: userId
        });

        const goTo = new URLSearchParams(location.search).get('goTo');
        if (goTo) {
            this.switchActivePage(goTo);
        }
    }

    switchActivePage = (active) => {
        this.setState({active: active})
    };

    getActivePage = () => {
        switch (this.state.active) {
            case SAVED_POST_PAGE:
                return <ProfileSavedPosts/>;
            case PUBLISHED_PAGE:
                return <ProfilePublications/>;
            case FOLLOWING_PAGE:
                return this.getMaintantancePage();
            default:
                return null;
        }
    };

    getMaintantancePage = () => {
        return <div>
            <div>
                <img style={{height: '200px'}}
                     src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDEgNTEyLjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwMSA1MTIuMDAxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzk5LjU1NCwyOTMuMTc3Yy0xNC41MDIsMC0yNi4zLDExLjc5OC0yNi4zLDI2LjNjMCwxNC41MDIsMTEuNzk4LDI2LjMsMjYuMywyNi4zczI2LjMwMS0xMS43OTgsMjYuMzAxLTI2LjMgICAgQzQyNS44NTUsMzA0Ljk3Niw0MTQuMDU2LDI5My4xNzcsMzk5LjU1NCwyOTMuMTc3eiBNMzk5LjU1NCwzMzAuNzc4Yy02LjIzMSwwLTExLjMwMS01LjA3LTExLjMwMS0xMS4zMDEgICAgYzAtNi4yMzIsNS4wNzEtMTEuMzAxLDExLjMwMS0xMS4zMDFjNi4yMzIsMCwxMS4zMDIsNS4wNywxMS4zMDIsMTEuMzAxQzQxMC44NTYsMzI1LjcwOCw0MDUuNzg3LDMzMC43NzgsMzk5LjU1NCwzMzAuNzc4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTExMi40NzMsMjkzLjE3NmMtMTQuNTAyLDAtMjYuMzAxLDExLjc5OC0yNi4zMDEsMjYuM2MwLDE0LjUwMiwxMS43OTksMjYuMywyNi4zMDEsMjYuM3MyNi4zLTExLjc5OCwyNi4zLTI2LjMgICAgQzEzOC43NzMsMzA0Ljk3NSwxMjYuOTc1LDI5My4xNzYsMTEyLjQ3MywyOTMuMTc2eiBNMTEyLjQ3MywzMzAuNzc5Yy02LjIzMiwwLTExLjMwMi01LjA3LTExLjMwMi0xMS4zMDEgICAgYzAtNi4yMzIsNS4wNy0xMS4zMDEsMTEuMzAyLTExLjMwMWM2LjIzMSwwLDExLjMwMSw1LjA3LDExLjMwMSwxMS4zMDFDMTIzLjc3NCwzMjUuNzA5LDExOC43MDQsMzMwLjc3OSwxMTIuNDczLDMzMC43Nzl6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzczLjg4MSwxMzcuODY4Yy0xOC43Ny0xMC45NTMtNDAuMDU2LTE0LjEyOC01OS45MzItOC45NDFjLTQuMDA4LDEuMDQ1LTYuNDA5LDUuMTQzLTUuMzYzLDkuMTQ5ICAgIGMxLjA0Niw0LjAwNyw1LjE0Miw2LjQxMiw5LjE0OSw1LjM2NGMxNi4wMTItNC4xNzgsMzMuMjY3LTEuNTU2LDQ4LjU4NSw3LjM4NGMzLjU3NywyLjA4NSw4LjE2OSwwLjg4MiwxMC4yNTctMi42OTggICAgQzM3OC42NjUsMTQ0LjU0OSwzNzcuNDU3LDEzOS45NTYsMzczLjg4MSwxMzcuODY4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTE5OC4wNzksMTI4LjkyOGMtMTkuODc2LTUuMTg4LTQxLjE2MS0yLjAxMi01OS45MzIsOC45NDFjLTMuNTc3LDIuMDg4LTQuNzg1LDYuNjgxLTIuNjk3LDEwLjI1NyAgICBjMi4wOTcsMy41OTQsNi42OTcsNC43NzQsMTAuMjU3LDIuNjk3YzE1LjMxOS04LjkzOSwzMi41NzMtMTEuNTYsNDguNTg1LTcuMzgzYzQuMDA0LDEuMDQ3LDguMTA0LTEuMzU1LDkuMTQ5LTUuMzYzICAgIEMyMDQuNDg4LDEzNC4wNywyMDIuMDg3LDEyOS45NzMsMTk4LjA3OSwxMjguOTI4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPGNpcmNsZSBjeD0iMzQyLjI4OSIgY3k9IjIzNi43ODUiIHI9IjkuNjYzIiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTY5LjczNCwxODQuNDY4Yy0yOC44NDcsMC01Mi4zMTgsMjMuNDY5LTUyLjMxOCw1Mi4zMThzMjMuNDcxLDUyLjMxOCw1Mi4zMTgsNTIuMzE4ICAgIGMyOC44NDcsMCw1Mi4zMTgtMjMuNDcsNTIuMzE4LTUyLjMxOFMxOTguNTgxLDE4NC40NjgsMTY5LjczNCwxODQuNDY4eiBNMTY5LjczNCwyNzQuMTA1Yy0yMC41NzgsMC0zNy4zMTktMTYuNzQxLTM3LjMxOS0zNy4zMTkgICAgYzAtMjAuNTc4LDE2Ljc0MS0zNy4zMTksMzcuMzE5LTM3LjMxOWMyMC41NzgsMCwzNy4zMTksMTYuNzQxLDM3LjMxOSwzNy4zMTlDMjA3LjA1MiwyNTcuMzY0LDE5MC4zMTIsMjc0LjEwNSwxNjkuNzM0LDI3NC4xMDV6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8Y2lyY2xlIGN4PSIxNjkuNzMiIGN5PSIyMzYuNzg1IiByPSI5LjY2MyIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI5Ny40NzUsMzUzLjg4NWgtODIuOTIzYy00LjE0MywwLTcuNSwzLjM1OC03LjUsNy41YzAsNC4xNDIsMy4zNTgsNy41LDcuNSw3LjVoODIuOTIzYzQuMTQzLDAsNy41LTMuMzU4LDcuNS03LjUgICAgQzMwNC45NzQsMzU3LjI0MywzMDEuNjE3LDM1My44ODUsMjk3LjQ3NSwzNTMuODg1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTM5Mi40MTMsMjIxLjc3MmMtMS4xODgtMy45NjgtNS4zNjgtNi4yMjUtOS4zMzUtNS4wMzVjLTMuOTY4LDEuMTg4LTYuMjIzLDUuMzY3LTUuMDM1LDkuMzM0ICAgIGM3LjE3OSwyMy45ODctMTAuODgzLDQ4LjAzMi0zNS43NSw0OC4wMzJjLTIwLjU3OCwwLTM3LjMxOS0xNi43NDEtMzcuMzE5LTM3LjMxOWMwLTI3Ljk0NywyOS42OC00NS44NTIsNTQuMzA5LTMzLjIyMiAgICBjMy42ODEsMS44ODgsOC4yMDQsMC40MzUsMTAuMDk1LTMuMjUyYzEuODktMy42ODYsMC40MzQtOC4yMDUtMy4yNTItMTAuMDk1Yy0zNC41MzEtMTcuNzA1LTc2LjE1Miw3LjM3NS03Ni4xNTIsNDYuNTY5ICAgIGMwLDI4Ljg0OSwyMy40Nyw1Mi4zMTksNTIuMzE4LDUyLjMxOUMzNzcuMTEzLDI4OS4xMDQsNDAyLjQ4NywyNTUuNDM1LDM5Mi40MTMsMjIxLjc3MnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NzcuNjUyLDEyOC4wNDNDNDA3LjIyNiw2LjA1OCwyNTEuNjU1LTM2LjE1MSwxMjkuMjA2LDMzLjcxOGMtMy41OTgsMi4wNTMtNC44NTEsNi42MzMtMi43OTcsMTAuMjMgICAgYzIuMDUyLDMuNTk4LDYuNjMyLDQuODUsMTAuMjI5LDIuNzk3YzExNS4xNzQtNjUuNzE4LDI2MS42NjMtMjYuMTQyLDMyOC4wMjQsODguNzk2YzU0LjY0Myw5NC42NDYsMzguNzA1LDIxNC40NTgtMzguNzYyLDI5MS4zNjIgICAgYy0yLjkzOSwyLjkxOC0yLjk1Nyw3LjY2Ny0wLjAzOCwxMC42MDZzNy42NjcsMi45NTYsMTAuNjA1LDAuMDM5QzUxOC43NjEsMzU1Ljg1Miw1MzUuNjk2LDIyOC41OCw0NzcuNjUyLDEyOC4wNDN6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDEwLjU0LDQ1MC42ODZjLTIuNDc0LTMuMzI0LTcuMTctNC4wMTYtMTAuNDkzLTEuNTQyYy0xMTYuMjM4LDg2LjQ0Mi0yODAuNzMzLDUxLjk0OC0zNTIuNjgzLTcyLjY3NSAgICBjLTYwLjc1NC0xMDUuMjI4LTMzLjIyMy0yMzguMDA4LDYxLjAyMi0zMTAuODhjMy4yNzYtMi41MzQsMy44NzktNy4yNDQsMS4zNDYtMTAuNTJjLTIuNTM2LTMuMjc3LTcuMjQ2LTMuODc4LTEwLjUyLTEuMzQ1ICAgIEMtMC44OTksMTMxLjEzMS0zMC4xNzQsMjcyLjE2OCwzNC4zNzUsMzgzLjk2OWM3Ni4zNCwxMzIuMjIzLDI1MS4wNDEsMTY5LjExNSwzNzQuNjIzLDc3LjIxMSAgICBDNDEyLjMyMSw0NTguNzA4LDQxMy4wMTIsNDU0LjAxLDQxMC41NCw0NTAuNjg2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="/>

            </div>
            <div>
                <h1>Эта функция еще в разработке</h1>
            </div>
        </div>
    };


    render() {
        return (
            <div className="container-wrapper">
                <style jsx>{styles}</style>
                {this.state &&
                <div>
                    <ProfileMainContentNavigation active={this.state.active} switchActivePage={this.switchActivePage}/>
                    {this.getActivePage()}
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(ProfileMainContent)

