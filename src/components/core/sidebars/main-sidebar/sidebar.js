import React from 'react'
import SidebarHeader from './components/sidebarheader'
import styles from '../../../../../res/styles/sidebar.scss'
import loginStyles from '../../../../../res/styles/user/login.scss'

const mobileViewSize = 850;

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.setState({
            width: window.innerWidth
        });
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            width: window.innerWidth
        })
    }


    render() {
        let sidebar = typeof window !== 'undefined' && this.state && this.state.width > mobileViewSize;
        return (
            <div>
                {sidebar ?
                    <div>
                        <style jsx>{styles}</style>
                        <style jsx>{loginStyles}</style>
                        <div className="sidebar">
                            <div className='profile'>
                                <SidebarHeader/>
                            </div>
                        </div>
                    </div> : null}

            </div>
        )
    }
};
