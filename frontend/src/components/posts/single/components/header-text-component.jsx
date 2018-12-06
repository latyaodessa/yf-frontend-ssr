import React from 'react'
import styles from "../../../../../res/styles/single-post.scss"
import elementsStyle from "../../../../../res/styles/common/elements.scss"

export default class HeaderText extends React.Component {
    regexCleaner(text) {
        return text && text.replace(/#.*s/, '').replace(/\[.*\|/, '').replace(/]/, '').replace(/http.*/, '');
    }

    render() {
        return (

            <div className="top-text">
                <style jsx>{styles}</style>
                <style jsx>{elementsStyle}</style>
                {this.props.post.mdSimple &&
                <div className={"participant-container"}>
                    <img src={"/static/img/icons/woman-black.png"}/>
                    <span>{this.props.post.mdSimple}</span>
                </div>}
                {this.props.post.phSimple &&
                <div className={"participant-container"}>
                    <img src={"/static/img/icons/photo-camera-black.png"}/>
                    <span>{this.props.post.phSimple}</span>

                </div>}
                {!this.props.post.phSimple && !this.props.post.mdSimple &&
                <div className={"participant-container"}>
                    <img src={"/static/img/icons/artist-black.png"}/>
                    <span>{this.regexCleaner(this.props.post.text)}</span>

                </div>

                }
            </div>
        )
    }
}
