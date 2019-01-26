import React from 'react'
// import {Link} from 'react-router-dom'


const Footer = () => {
    return (
        <ul style={inlineStyle.footer} className="navigation">
            <li>
                {/*<Link to="/" className="active">Главная</Link>*/}
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
        height: "20px"
    }
};

export default Footer;
