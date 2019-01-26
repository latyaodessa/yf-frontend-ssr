import React from 'react'
import {connect} from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Form, Grid, Icon, Label, Segment, TextArea} from 'semantic-ui-react'
import styles from '../styles.scss';
import {
    CITY,
    COUNTRY,
    DATE_PICKER_LOCALE,
    ERROR_REQUIRED_FIELD,
    GENERAL_DATE_DESCR_LABEL,
    GENERAL_PHSHOOTING_INFO_LABEL,
    PHOTOSHOOTING_DESCRIPTION,
    PHOTOSHOOTING_TITLE
} from "../../../../messages/submission";
import ParticipantsEquipmentForm from './ParticipantsEquipmentForm';
import _ from 'lodash';
import moment from 'moment';

class PhotoshootingDescriptionForm extends React.Component {

    constructor(props) {
        super(props);
        if (props.submission && props.submission.data) {
            this.state = {
                // countries: [],
                about: props.submission.data.about,
                date: null,
                title: props.submission.data.title,
                country: props.submission.data.country,
                city: props.submission.data.city,
                phEquipment: [props.submission.data.equipment],
                errors: {}
            }
        } else {
            this.state = {
                // countries: [],
                about: '',
                title: title,
                date: null,
                country: '',
                city: '',
                phEquipment: [],
                errors: {}
            }
        }

    }


    componentDidMount() {
        this.props.onRef(this);

        // this.props.dispatch(searchCountry()).then(() => {
        //     this.setState({
        //         countries: this.props.country.data.map(cntr => {
        //             return {key: cntr.id, value: cntr.titleRu, text: cntr.titleRu}
        //         })
        //     })
        // })
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    isBlank = (str) => {
        return (!str || /^\s*$/.test(str));
    };


    commit = async () => {

        let errors = {};


        if (this.isBlank(this.state.about)) {
            errors[`about`] = ERROR_REQUIRED_FIELD;
        }
        if (this.isBlank(this.state.date)) {
            errors[`date`] = ERROR_REQUIRED_FIELD;
        }
        if (this.isBlank(this.state.country)) {
            errors[`country`] = ERROR_REQUIRED_FIELD;
        }
        if (this.isBlank(this.state.city)) {
            errors[`city`] = ERROR_REQUIRED_FIELD;
        }
        if (this.isBlank(this.state.title)) {
            errors[`title`] = ERROR_REQUIRED_FIELD;
        }

        this.setState({
            errors
        });

        if (_.isEmpty(errors)) {
            return {
                about: this.state.about,
                date: moment(this.state.date).unix(),
                country: this.state.country,
                city: this.state.city,
                title: this.state.title,
                equipment: this.state.phEquipment.toString()
            }
        } else {
            throw ERROR_REQUIRED_FIELD;
        }

        return errors;
    };

    renderInputFieldWithValidation = (name, label, descr, defaultValue) => {
        return <Form.Field>
            <Form.Input
                fluid
                name={name}
                label={label}
                placeholder={descr}
                defaultValue={defaultValue}
                onChange={this.handleChange}
            />

            {this.state.errors
            && this.state.errors[name]
            && <Label style={{background: "#de6262", color: "#FFF"}} basic pointing>
                *{this.state.errors[name]}
            </Label>}
        </Form.Field>
    };

    handleCountryChange = (e, data) => {
        const {value} = data;
        const selectedValue = data.options.find(o => o.value === value);
        this.setState({
            country: selectedValue
        })
    };

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    };


    handlePhEquipmentChange = (evt) => {

        let phEq = this.state.phEquipment;
        phEq[evt.target.name] = evt.target.value;
        this.setState({
            phEquipment: phEq
        });
    };


    getGeneralInfo = () => {
        return <Grid stackable columns={2}>
            <style jsx>{styles}</style>
            <Grid.Column>
                <Segment textAlign='left'>
                    <Label attached='top'>{GENERAL_PHSHOOTING_INFO_LABEL}</Label>
                    <Grid stackable columns={1}>
                        <Grid.Column>
                            <Form>
                                <Form.Group widths={'equal'}>
                                    {this.renderInputFieldWithValidation("country", COUNTRY, COUNTRY, this.state.country)}
                                    {this.renderInputFieldWithValidation("city", CITY, CITY, this.state.city)}
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                            <div className={"date-picker-container"}>
                                <div className={"label"}>
                                    <Icon name='calendar alternate outline' size={"large"}/>
                                </div>
                                <Form>
                                    <DatePicker
                                        locale={DATE_PICKER_LOCALE}
                                        selected={this.state.date}
                                        placeholderText={GENERAL_DATE_DESCR_LABEL}
                                        onChange={(date) => this.setState({date})}/>
                                </Form>
                                {this.state.errors
                                && this.state.errors["date"]
                                && <Label style={{background: "#de6262", color: "#FFF"}} basic pointing={'left'}>
                                    *{this.state.errors["date"]}
                                </Label>}
                            </div>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Grid.Column>
            <Grid.Column textAlign='left'>
                <ParticipantsEquipmentForm participants={this.props.participants}
                                           handlePhEquipmentChange={this.handlePhEquipmentChange}/>
            </Grid.Column>
        </Grid>
    };


    render() {
        return <div>
            <style jsx>{styles}</style>
            <Grid stackable columns={1}>
                <Grid.Column>
                    <Form.Group widths='equal'>

                        <Form.Input label={""}
                                    fluid iconPosition='left' placeholder={PHOTOSHOOTING_TITLE}
                                    name={"title"}
                                    defaultValue={this.state.title}
                                    onChange={this.handleChange}>

                            <Icon name='pencil alternate'/>
                            <input/>

                        </Form.Input>
                        {this.state.errors
                        && this.state.errors['title']
                        && <Label style={{background: "#de6262", color: "#FFF"}} basic pointing>
                            *{this.state.errors[`title`]}
                        </Label>}
                    </Form.Group>

                    <Form>
                            <TextArea
                                defaultValue={this.state.about}
                                style={{
                                color: "rgb(82, 85, 89)",
                                fontWeight: 300,
                                fontSize: "1.5em",
                                lineHeight: "1.09524",
                                margin: "0.67em 0px"
                            }} name="about" autoHeight
                                      placeholder={PHOTOSHOOTING_DESCRIPTION}
                                      onChange={this.handleChange}/>
                        {this.state.errors
                        && this.state.errors['about']
                        && <Label style={{background: "#de6262", color: "#FFF"}} basic pointing>
                            *{this.state.errors[`about`]}
                        </Label>}
                    </Form>
                </Grid.Column>
            </Grid>
            {this.getGeneralInfo()}
        </div>
    }
}

function mapStateToProps(state) {
    const {country} = state;
    return {country: country};
}

export default connect(mapStateToProps)(PhotoshootingDescriptionForm);
