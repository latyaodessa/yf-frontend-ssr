import React from 'react'
import styles from "../../../../../res/styles/single-post.scss"

export default class PicsRenderer extends React.Component {
    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                <div className="pics-content">
                    {this.props.largePics.map(pic => <div key={pic} className="img-container"><img
                        className="single-img" src={pic}/></div>)}
                </div>
            </div>
        )
    }
}
