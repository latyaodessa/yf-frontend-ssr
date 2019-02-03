import React from 'react'
import styles from "../../../../../res/styles/single-post.scss"

export default class StoragePicsRenderer extends React.Component {
    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                <div className="pics-content">
                    {this.props.pics.map(pic => <div key={pic.fieldId} className="img-container">
                        <img className="single-img" alt={pic.fileName} src={pic.friendlyLink}/></div>)}
                </div>
            </div>
        )
    }
}
