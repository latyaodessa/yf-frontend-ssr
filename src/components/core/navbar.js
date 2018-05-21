import React from 'react'
import MobileMenu from './mobile-menu'
import DesktopMenu from './main-menu'

const mobileViewSize = 850;

class Navbar extends React.Component {

    render() {
        return (
            <div>
                {typeof window !== 'undefined' && window.innerWidth <= mobileViewSize ? <MobileMenu/> :
                    <DesktopMenu/>
                }
            </div>);


    };
}

export default Navbar;
