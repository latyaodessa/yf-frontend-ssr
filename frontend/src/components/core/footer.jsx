import React from 'react'
import {Link} from "../../../routes";
import {ABOUT_CONTACTS, TERMS} from "../../messages/core";


const Footer = () => {
    return (
        <ul style={inlineStyle.footer} className="navigation">
            <li>
                <Link route='terms_pub'><a style={inlineStyle.link}>{TERMS}</a></Link>
                <Link route='about'><a style={inlineStyle.link}> {ABOUT_CONTACTS}</a></Link>
            </li>
        </ul>
    );
};

const inlineStyle = {
    footer: {
        background: "#b38f83",
        listStyleType: "none",
        margin: 0,
        padding: 0,
        height: "20px",
        textAlign: 'right'
    },
    link: {
        color: '#FFF',
        paddingLeft: '10px'
    }
};

export default Footer;
