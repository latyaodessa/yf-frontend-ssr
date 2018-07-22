import React from "react";
import style from './style.scss'

class FullWidthForm extends React.Component {
    render() {
        return <div className="full-form-wrapper">
            <style jsx>{style}</style>
            <h1>{this.props.title}</h1>
            <form onSubmit={this.props.handleSubmit.bind(this)}>
                {this.props.children}
            </form>
        </div>
    }


}

export default FullWidthForm;
