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
                {this.props.post.mdSimple ? <ul className="md">
                    <li>{this.props.post.mdSimple}</li>
                </ul> : null}
                {this.props.post.phSimple ? <ul className="ph">
                    <li>{this.props.post.phSimple}</li>
                </ul> : null}
                {!this.props.post.phSimple && !this.props.post.mdSimple ? <ul className="art">
                    <li>{this.regexCleaner(this.props.post.text)}</li>
                </ul> : null}
            </div>
        )
    }
}
