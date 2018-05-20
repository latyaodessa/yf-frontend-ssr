import React from 'react'
import MobileMenu from './mobile-menu'
import DesktopMenu from './main-menu'

const mobileViewSize = 850;

const Navbar = () => (

    <div>
        {/*{console.log(window)}*/}
        <DesktopMenu/>
        <MobileMenu />
    </div>


);
export default Navbar;

// export default class Navbar extends React.Component {
//
//     render() {
//
//         let mobileMenu = this.props.width <= this.props.mobileViewSize ? <MobileMenu/> : '';
//         let mainMenu = this.props.width > this.props.mobileViewSize ? <MainMenu/> : '';
//         return (
//             <div>
//                 {/*{mobileMenu}*/}
//                 {/*{mainMenu}*/}
//                 <MainMenu/>
//             </div>
//         );
//     }
// }
