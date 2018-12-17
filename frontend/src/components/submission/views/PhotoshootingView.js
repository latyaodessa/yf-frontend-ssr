import React from 'react'
import {connect} from "react-redux";
import PhotoshootingDescriptionForm from './components/PhotoshootingDescriptionForm';
import {Button, Checkbox, Grid, Label} from 'semantic-ui-react'
import {BACK_BUTTON, CHECKBOX_1, CHECKBOXES_NOT_CHECKED, LINK_TERMS, SUBMIT_BUTTON} from "../../../messages/submission";
import ImageUploadForm from './components/ImageUploadForm';
import styles from './styles.scss';
import {VIEWS} from '../SubmissionViewsWrapper';
import {Link} from '../../../../routes'

export const PHOTOSHOOTING_VIEW = "photoshooting";

class PhotoshootingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            isSubmitting: false,
            uuid: props.initUuid,
            check1: false,
            error: null
        }

    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    };

    commit = async () => {

        try {
            this.setState({error: null});
            await this.imageUploadForm.commit();
            const description = await this.descriptionForm.commit();
            this.termsAndConditionsChecked();
            this.props.commitPhotoshooting(description);
        } catch (e) {
            this.setState({error: e})
        }

    };

    termsAndConditionsChecked = () => {
        if (!this.state.check1) {
            throw CHECKBOXES_NOT_CHECKED;
        }
    };


    handleClick = (e, {id}) => {
        if (id === "check1") {
            this.setState({check1: !this.state.check1});
        }
    };


    checkboxes = () => {
        return <div className={"checkboxes-container"}>
            <style jsx>{styles}</style>
            <div><Checkbox id="check1" checked={this.state.check1} onClick={this.handleClick}
                           label={CHECKBOX_1}/>
                <a href={"/terms/publication"} target="_blank">{LINK_TERMS}</a>
            </div>
        </div>

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
                    {this.checkboxes()}


                    {this.state.error && <div style={{textAlign: 'center'}}>
                        <Label style={{background: "#de6262", color: "#FFF", textAlign: "center"}} basic
                               pointing>*{this.state.error}</Label>
                    </div>}


                    <div>
                        <Grid>
                            <Grid.Column floated='left' width={5}>
                                <Button onClick={() => this.props.goToPage(VIEWS.PARTICIPATS_VIEW)}
                                        content={BACK_BUTTON}
                                        icon='left arrow' labelPosition='left'/>
                            </Grid.Column>
                            <Grid.Column floated='right' width={5}>
                                <Button onClick={this.commit} style={{background: '#3b9c9a'}}
                                        content={SUBMIT_BUTTON}
                                        primary/>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(PhotoshootingView);

