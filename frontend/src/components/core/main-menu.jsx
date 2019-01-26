import Link from 'next/link'
import {ART_PAGE, EXCLUSIVE_PAGE, MAIN_PAGE, NATIVE_PAGE, SETS_PAGE} from '../../messages/core'
import styles from '../../../res/styles/navigation.scss'
import searchStyles from '../../../res/styles/search-post.scss'
import DropDownNavMenu from './menu-components/DropDownNavMenu'
import {Icon} from 'semantic-ui-react'

const DesktopMenu = () => (
    <div>
        <style jsx>{styles}</style>
        <style jsx>{searchStyles}</style>
        <ul className="navigation">
            <li>
                <Link href='/'><a>{MAIN_PAGE}</a></Link>
            </li>
            <li>
                <Link href='/exclusive'><a>
                    <Icon name='star'/>
                    {EXCLUSIVE_PAGE}
                </a></Link>
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
                    <Link href='/search'><a><img src="/static/img/icons/search-white.png"/></a></Link>
                </div>
            </li>
            <li><DropDownNavMenu/></li>
        </ul>
    </div>
);

export default DesktopMenu;
