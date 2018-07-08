import React from 'react'
import MobileMenu from './mobile-menu'
import DesktopMenu from './main-menu'
import WindowSizeListener from 'react-window-size-listener'

const mobileViewSize = 850;

class Navbar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            mobile: false
        };
    }

    render() {
        return (
            <div>
                <WindowSizeListener
                    onResize={(windowSize) =>
                        this.setState({mobile: windowSize.windowWidth <= mobileViewSize})}>
                    {this.state.mobile ? <MobileMenu/> :
                        <DesktopMenu/>}
                </WindowSizeListener>
            </div>);
    };
}

export default Navbar;
