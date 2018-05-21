import React from 'react'
import SidebarHeader from './components/sidebarheader'
import styles from '../../../../../res/styles/sidebar.scss'
import loginStyles from '../../../../../res/styles/user/login.scss'

const mobileViewSize = 850;

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // width: window.innerWidth,
            mobileViewSize: 850,
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        // window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        // window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        // this.setState({
        // width: window.innerWidth
        // })
    }


    render() {
        // let sidebar = this.state.width > this.state.mobileViewSize ? this.getSideBar() : '';

        return (
            <div>
                {typeof window !== 'undefined' && window.innerWidth <= mobileViewSize ? null :
                    <div>
                        <style jsx>{styles}</style>
                        <style jsx>{loginStyles}</style>
                        <div className="sidebar">
                            <div className='profile'>
                                <SidebarHeader/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
};
