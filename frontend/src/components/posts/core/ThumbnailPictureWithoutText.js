import {Link} from '../../../../routes'
import elementsStyles from '../../../../res/styles/common/elements.scss'
import styles from '../../../../res/styles/main.scss'
import React from 'react'
import {EXLUSIVE, READ_MORE} from "../../../messages/core";

const ThumbnailPictureWithoutText = (props) => (
    <div style={{position: "relative"}}>
        <style jsx>{styles}</style>
        <style jsx>{elementsStyles}</style>
        <div className="grig-img-container">
            <img style={{height: "600px", padding: 0}} className="grig-img" src={props.post.thumbnail}/>

        </div>

        <div style={inlineStyles.textContainer}>
            <div>
                <span style={inlineStyles.exlusiveTitle}>
                    {EXLUSIVE}
                </span>
            </div>
            <div>
            <span
                style={props.customStyles && props.customStyles.textSpan ? props.customStyles.textSpan : inlineStyles.textSpan}>
            {props.post.title}
            </span>
                <div>
                    <Link route='pub' params={{link: props.post.link}}>
                        <a style={inlineStyles.readMoreTitle}>
                            {READ_MORE}
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const inlineStyles = {
    textContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        textAlign: "center",
        transform: "translate(-50%, -50%)"
    },
    textSpan: {
        fontSize: "4.5rem",
        color: "#FFF",
        textTransform: "none",
        fontFamily: "'Philosopher', sans-serif"
    },
    exlusiveTitle: {
        color: "#c7c7c7",
        margin: "10px"
    },
    readMoreTitle: {
        color: "#c7c7c7",
        margin: "10px",
        textDecoration: "underline"
    }
};

export default ThumbnailPictureWithoutText;
