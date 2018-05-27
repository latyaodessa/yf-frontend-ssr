import Link from 'next/link'
import {ART_PAGE, MAIN_PAGE, NATIVE_PAGE, SETS_PAGE} from '../../messages/core'
import LoginLogoutButton from '../core/menu-components/login-logout-button'
// import SearchIcon from '../../static/img/64/search-icon.png'
import styles from '../../../res/styles/navigation.scss'
import searchStyles from '../../../res/styles/search-post.scss'

const DesktopMenu = () => (
    <div>
        <style jsx>{styles}</style>
        <style jsx>{searchStyles}</style>
        <ul className="navigation">
            <li>
                <Link href='/'><a>{MAIN_PAGE}</a></Link>
            </li>
            <li>
                <Link href='/native'><a>{NATIVE_PAGE}</a></Link>
            </li>
            <li>
                <Link href='/sets'><a>{SETS_PAGE}</a></Link>
            </li>
            <li>
                <Link href='/art'><a>{ART_PAGE}</a></Link>
            </li>
            <li className="prev-last-li">
                <div className="search-icon">
                    <Link href='/search'><a><img src="/static/img/64/search-icon.png"/></a></Link>
                </div>
            </li>
            {/*<LoginLogoutButton/>*/}
        </ul>
    </div>
);

export default DesktopMenu;
