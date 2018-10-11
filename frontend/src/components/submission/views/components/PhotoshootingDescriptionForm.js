import React from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {Form, Grid, Icon, Label, Segment, TextArea} from 'semantic-ui-react'
import styles from '../styles.scss';
import {
    CITY,
    COUNTRY,
    DATE_PICKER_LOCALE,
    GENERAL_DATE_DESCR_LABEL,
    GENERAL_PHSHOOTING_INFO_LABEL,
    PHOTOSHOOTING_DESCRIPTION
} from "../../../../messages/submission";
import ParticipantsEquipmentForm from './ParticipantsEquipmentForm';

class PhotoshootingDescriptionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: moment()

        }

    }

    renderInputFieldWithValidation = (name, label, descr) => {
        return <Form.Field>
            <Form.Input
                fluid
                name={name}
                label={label}
                placeholder={descr}/>

            {/*{this.props.errors*/}
            {/*&& this.props.errors[name]*/}
            {/*&& <Label style={{background: "#de6262", color: "#FFF"}} basic pointing>*/}
            {/**{this.props.errors[name]}*/}
            {/*</Label>}*/}
        </Form.Field>
    };

    getGeneralInfo = () => {
        return <Grid stackable columns={2}>
            <style jsx>{styles}</style>
            <Grid.Column>
                <Segment textAlign='left'>
                    <Label attached='top'>{GENERAL_PHSHOOTING_INFO_LABEL}</Label>
                    <Grid stackable columns={1}>
                        <Grid.Column>
                            <Form.Group widths={'equal'}>
                                {this.renderInputFieldWithValidation("country", COUNTRY, COUNTRY)}
                                {this.renderInputFieldWithValidation("city", CITY, CITY)}
                            </Form.Group>
                        </Grid.Column>
                        <Grid.Column>
                            <div className={"date-picker-container"}>
                                <div className={"label"}>
                                    <Icon name='calendar alternate outline' size={"large"}/>
                                </div>

                                <DatePicker
                                    locale={DATE_PICKER_LOCALE}
                                    placeholderText={GENERAL_DATE_DESCR_LABEL}/>
                            </div>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Grid.Column>
            <Grid.Column textAlign='left'>
                <ParticipantsEquipmentForm participants={this.props.participants}/>
            </Grid.Column>
        </Grid>
    };


    render() {
        return <div>
            <style jsx>{styles}</style>
            <Grid stackable columns={1}>
                <Grid.Column>
                    <Form>
                            <TextArea style={{
                                color: "rgb(82, 85, 89)",
                                fontWeight: 300,
                                fontSize: "1.5em",
                                lineHeight: "1.09524",
                                margin: "0.67em 0px"
                            }} name="description" onChange={this.props.handleChange} autoHeight
                                      placeholder={PHOTOSHOOTING_DESCRIPTION}/>
                    </Form>
                </Grid.Column>
            </Grid>
            <Form>
                {/*<div className={"text-form"}>*/}

                {/*</div>*/}
                {this.getGeneralInfo()}
            </Form>
        </div>
    }
};

export default PhotoshootingDescriptionForm;
