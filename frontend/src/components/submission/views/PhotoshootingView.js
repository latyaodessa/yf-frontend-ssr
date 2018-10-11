import React from 'react'
import {connect} from "react-redux";
import PhotoshootingDescriptionForm from './components/PhotoshootingDescriptionForm';
import ImageUploadForm from './components/ImageUploadForm';
import styles from './styles.scss';

export const PHOTOSHOOTING_VIEW = "photoshooting";

class PhotoshootingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            isSubmitting: false
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        return nextState.isSubmitting;
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    };


    render() {
        console.log("render");
        return (
            <div>
                <style jsx>{styles}</style>

                <div>
                    <PhotoshootingDescriptionForm handleChange={this.handleChange} participants={this.props.participants}/>
                    <ImageUploadForm/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(PhotoshootingView);

