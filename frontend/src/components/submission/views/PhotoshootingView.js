import React from 'react'
import {connect} from "react-redux";
import PhotoshootingDescriptionForm from './components/PhotoshootingDescriptionForm';
import {Button, Grid} from 'semantic-ui-react'
import {BACK_BUTTON, SUBMIT_BUTTON} from "../../../messages/submission";
import ImageUploadForm from './components/ImageUploadForm';
import styles from './styles.scss';
import {VIEWS} from '../SubmissionViewsWrapper';

export const PHOTOSHOOTING_VIEW = "photoshooting";

class PhotoshootingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            isSubmitting: false,
            uuid: props.initUuid
        }

    }

    // componentDidMount() {
    //     const uuid = new URLSearchParams(location.search).get('uuid');
    //     console.log(uuid);
    //     this.setState({
    //         uuid: uuid
    //     })
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextState);
    //     return nextState.isSubmitting;
    // }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    };

    commit = async () => {

        let isError = false;
        try {
            let description = await this.descriptionForm.commit();
        } catch (e) {
            isError = true;
        }
        try {
            console.log("hello");
            let imgs = await this.imageUploadForm.commit();
        } catch (e) {
            console.log(e);
            isError = true;
        }

    };


    render() {
        return (
            <div>
                <style jsx>{styles}</style>

                {this.state && this.state.uuid && <div>
                    <div>
                        <PhotoshootingDescriptionForm
                            onRef={ref => (this.descriptionForm = ref)}
                            participants={this.props.participants}/>
                        <ImageUploadForm onRef={ref => (this.imageUploadForm = ref)}
                                         initUuid={this.state.uuid}/>
                    </div>

                    <div>
                        <Grid>
                            <Grid.Column floated='left' width={5}>
                                <Button onClick={() => this.props.goToPage(VIEWS.PARTICIPATS_VIEW)}
                                        content={BACK_BUTTON}
                                        icon='left arrow' labelPosition='left'/>
                            </Grid.Column>
                            <Grid.Column floated='right' width={5}>
                                <Button onClick={this.commit} style={{background: '#3b9c9a'}} content={SUBMIT_BUTTON}
                                        primary/>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(PhotoshootingView);

