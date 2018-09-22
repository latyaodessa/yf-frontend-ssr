import React from 'react'
import {connect} from "react-redux";
import {FieldArray, Form as FormFormik, Formik, ErrorMessage, Field, Debug} from 'formik';
import {Element, Events, scroller, scrollSpy} from 'react-scroll'
import {Button, Dropdown, Form, Grid, Icon, Label} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import styles from './styles.scss'
import * as Yup from 'yup';

import {
    ADD_HAIR_STYLIST,
    ADD_MD_BUTTON,
    ADD_MUA,
    ADD_PH_BUTTON,
    ADD_SET_DESIGNER,
    ADD_WARDROBE_STYLIST,
    ADDITIONAL_PARTICIPANTS,
    CHOOSE_SOCIAL,
    CITY,
    COUNTRY,
    FACEBOOK_DESCR,
    FIRST_NAME,
    FIRST_NAME_MODEL_DESCR,
    HAIR_STYLIST,
    INSTAGRAM_DESCR,
    LAST_NAME,
    LAST_NAME_MODEL_DESCR,
    MODEL,
    MUA,
    PHOTOGRAPHER,
    SET_DESIGNER,
    VK_DESCR,
    WARDROBE_STYLIST
} from "../../../messages/submission";

const FIRST_REMOVAL_EXCEPTIONS = [MODEL, PHOTOGRAPHER];

class ParticipantsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAdditional: '',
            scrollToElement: ''
        };

    }

    componentDidMount() {
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
        scrollSpy.update();
    }

    componentDidUpdate() {
        if (this.state.scrollToElement) {
            this.execScrollToElement(this.state.scrollToElement);
            this.setState({scrollToElement: ''})
        }
    }

    generateEmptyObject = (number) => {
        return {
            number: number,
            firstName: '',
            lastName: '',
            country: '',
            city: '',
            instagram: '',
            vk: '',
            facebook: '',
            me: false
        }
    };

    handleAddNewCard = (selectedType, arrayParticipants) => {
        console.log(arrayParticipants);
        switch (selectedType) {
            case MODEL:
                const modelNumber = this.getNewNumber(arrayParticipants);
                const newMd = this.generateEmptyObject(modelNumber);
                arrayParticipants.push(newMd);
                this.setState({
                    scrollToElement: selectedType + modelNumber
                });
                break;
            case PHOTOGRAPHER:
                const phNumber = this.getNewNumber(arrayParticipants);
                const newPh = this.generateEmptyObject(phNumber);
                arrayParticipants.push(newPh);
                this.setState({
                    scrollToElement: selectedType + phNumber
                });
                break;
            case MUA:
                const muaNumber = this.getNewNumber(arrayParticipants);
                const newMua = this.generateEmptyObject(muaNumber);
                arrayParticipants.push(newMua);
                this.setState({
                    scrollToElement: selectedType + muaNumber
                });
                break;
            case HAIR_STYLIST:
                const hairNumber = this.getNewNumber(arrayParticipants);
                const newHs = this.generateEmptyObject(hairNumber);
                arrayParticipants.push(newHs);
                this.setState({
                    scrollToElement: selectedType + hairNumber
                });
                break;
            case WARDROBE_STYLIST:
                const wdNumber = this.getNewNumber(arrayParticipants);
                const newWd = this.generateEmptyObject(wdNumber);
                arrayParticipants.push(newWd);
                this.setState({
                    scrollToElement: selectedType + wdNumber
                });
                break;
            case SET_DESIGNER:
                const sdNumber = this.getNewNumber(arrayParticipants);
                const newSd = this.generateEmptyObject(sdNumber);
                arrayParticipants.push(newSd);
                this.setState({
                    scrollToElement: selectedType + sdNumber
                });
                break;
            default:
                break;

        }

    };

    getNewNumber = (array) => {
        if (array.length === 0) {
            return 0;
        }
        return Math.max.apply(Math, array.map((p) => p.number)) + 1;
    };

    handleDropDownOnSelect = (event, data) => {
        this.setState({selectedAdditional: ''});
        this.handleAddNewCard(data.value);
    };

    handleDeleteCard = (selectedType, number) => {
        switch (selectedType) {
            case MODEL:
                this.setState({
                    mds: this.state.mds.filter((p) => {
                        return p.number !== number
                    })
                });
                break;
            case PHOTOGRAPHER:
                this.setState({
                    phs: this.state.phs.filter((p) => {
                        return p.number !== number
                    })
                });
                break;
            case MUA:
                this.setState({
                    muas: this.state.muas.filter((p) => {
                        return p.number !== number
                    })
                });
                break;
            case HAIR_STYLIST:
                this.setState({
                    hairStylists: this.state.hairStylists.filter((p) => {
                        return p.number !== number
                    })
                });
                break;
            case WARDROBE_STYLIST:
                this.setState({
                    wardrobeStylists: this.state.wardrobeStylists.filter((p) => {
                        return p.number !== number
                    })
                });
                break;
            case SET_DESIGNER:
                this.setState({
                    setDesigner: this.state.setDesigner.filter((p) => {
                        return p.number !== number
                    })
                });
                break;
            default:
                break;

        }

    };

    execScrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 800,
            delay: 0,
            smooth: true
        })
    };

    renderCardForm(participant, imgAddress, type, props) {
       // console.log(props);
        return <Element name={type + participant.number}>
            <style jsx>{styles}</style>
            <div className="login-form">
                <img src={imgAddress} className="login-profile-img"/>
                <div className="profile-container">
                    <div className={"header"}>
                        <div className={"left-side"}>{type}</div>
                        {!(FIRST_REMOVAL_EXCEPTIONS.includes(type) && participant.number === 0) &&
                        <div className="delete-container">
                            <img className="delete-button-img" src={"/static/img/icons/close-button-red.png"}
                                 onClick={this.handleDeleteCard.bind(this, type, participant.number)}/>
                        </div>
                        }
                    </div>
                    <div className={"card-style"}>
                    </div>

                    <Form.Group widths='equal'>
                        <Form.Input onChange={props.handleChange} fluid name={`${type}.${participant.number}.firstName`}
                                    label={FIRST_NAME}
                                    placeholder={FIRST_NAME_MODEL_DESCR}/>
                        <Form.Input onChange={props.handleChange} fluid label={LAST_NAME}
                                    name={`${type}.${participant.number}.lastName`}
                                    placeholder={LAST_NAME_MODEL_DESCR}/>
                    </Form.Group>
                    <Form.Group unstackable widths={2}>
                        <Form.Input onChange={props.handleChange} label={COUNTRY} placeholder={COUNTRY}
                                    name={`${type}.${participant.number}.country`}/>
                        <Form.Input onChange={props.handleChange} label={CITY} placeholder={CITY}
                                    name={`${type}.${participant.number}.city`}/>
                    </Form.Group>
                    <div className={"independent-label"}>
                        <Label pointing='below'>{CHOOSE_SOCIAL}</Label>
                    </div>
                    <Form.Input onChange={props.handleChange} fluid iconPosition='left' placeholder={INSTAGRAM_DESCR}
                                name={`${type}.${participant.number}.instagram`}>

                        <Icon name='instagram'/>
                        <input/>
                    </Form.Input>
                    <Form.Input onChange={props.handleChange} fluid iconPosition='left' placeholder={VK_DESCR}
                                name={`${type}.${participant.number}.vk`}>
                        <Icon name='vk'/>
                        <input/>
                    </Form.Input>
                    <Form.Input onChange={props.handleChange} fluid iconPosition='left' placeholder={FACEBOOK_DESCR}
                                name={`${type}.${participant.number}.facebook`}>
                        <Icon name='facebook official'/>
                        <input/>
                    </Form.Input>
                </div>
            </div>
        </Element>
    }


    renderCardGrid = (type, arrayParticipants, thumbnail, buttonText, props) => {
        return <FieldArray
            name="mds"
            render={({insert, remove, push}) => (
                <Grid>
                    <style jsx>{styles}</style>
                    {arrayParticipants.map(p => {
                        return <Grid.Column key={p.number} mobile={16} tablet={16} computer={16}>
                            {this.renderCardForm(p, thumbnail, "mds", props)} //TODO
                        </Grid.Column>
                    })}

                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <div className={"centered"}>
                            <Button type="button"
                                    onClick={this.handleAddNewCard.bind(this, type, arrayParticipants)} icon
                                    labelPosition='left'>
                                <Icon name='plus'/>
                                {buttonText}
                            </Button>
                        </div>
                    </Grid.Column>
                </Grid>
            )}/>

    };

    renderAdditionalParticipant() {
        const options = [
            {key: MODEL, value: MODEL, text: MODEL, image: {src: "/static/img/icons/woman-black.png"}},
            {
                key: PHOTOGRAPHER,
                value: PHOTOGRAPHER,
                text: PHOTOGRAPHER,
                image: {src: "/static/img/icons/photo-camera-black.png"}
            },
            {key: MUA, value: MUA, text: MUA, image: {src: "/static/img/icons/mascara.png"}},
            {key: HAIR_STYLIST, value: HAIR_STYLIST, text: HAIR_STYLIST, image: {src: "/static/img/icons/salon.png"}},
            {
                key: WARDROBE_STYLIST,
                value: WARDROBE_STYLIST,
                text: WARDROBE_STYLIST,
                image: {src: "/static/img/icons/hanger.png"}
            },
            {
                key: SET_DESIGNER,
                value: SET_DESIGNER,
                text: SET_DESIGNER,
                image: {src: "/static/img/icons/hands-framing.png"}
            }
        ];
        return <div>
            <style jsx>{styles}</style>
            <div className={"full-width-centered"}>
                <Dropdown placeholder={ADDITIONAL_PARTICIPANTS} fluid selection options={options}
                          value={this.state.selectedAdditional} onChange={this.handleDropDownOnSelect}/>

            </div>
        </div>
    }

    renderBottomGrid = () => {
        return <Grid>
            <style jsx>{styles}</style>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderAdditionalParticipant()}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Button type="submit" content='Next' icon='right arrow' labelPosition='right'/>
            </Grid.Column>
        </Grid>
    };


    renderFormContent = (props) => {
        return <Grid>
            {props.values.mds && props.values.mds.length !== 0 && <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(MODEL, props.values.mds, "/static/img/icons/woman-black.png", ADD_MD_BUTTON, props)}
            </Grid.Column>}
            {props.values.phs && props.values.phs.length !== 0 && <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(PHOTOGRAPHER, props.values.phs, "/static/img/icons/photo-camera-black.png", ADD_PH_BUTTON)}
            </Grid.Column>}
            {props.values.muas && props.values.muas.length !== 0 && <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(MUA, props.values.muas, "/static/img/icons/mascara.png", ADD_MUA)}
            </Grid.Column>}
            {props.values.hairStylists && props.values.hairStylists.length !== 0 &&
            <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(HAIR_STYLIST, props.values.hairStylists, "/static/img/icons/salon.png", ADD_HAIR_STYLIST)}
            </Grid.Column>}
            {props.values.wardrobeStylists && props.values.wardrobeStylists.length !== 0 &&
            <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(WARDROBE_STYLIST, props.values.wardrobeStylists, "/static/img/icons/hanger.png", ADD_WARDROBE_STYLIST)}
            </Grid.Column>}
            {props.values.setDesigner && props.values.setDesigner.length !== 0 &&
            <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(SET_DESIGNER, props.values.setDesigner, "/static/img/icons/hands-framing.png", ADD_SET_DESIGNER)}
            </Grid.Column>}
            <Grid.Column mobile={16} tablet={16} computer={16}>
                {this.renderBottomGrid()}
            </Grid.Column>
        </Grid>
    };

    renderForm = () => {
        return <Formik
            initialValues={{
                mds: [
                    this.generateEmptyObject(0)
                ],
                phs: [
                    // this.generateEmptyObject(0)
                ],
                muas: [],
                hairStylists: [],
                setDesigner: [],
                wardrobeStylists: []
            }}
            validate={values => {
                console.log(values);
            }}
            onSubmit={values => {
                console.log(values);
            }}
            render={props => (
                    <Form onSubmit={props.handleSubmit}>
                        {this.renderFormContent(props)}
                    </Form>
            )}

        />
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <style jsx>{styles}</style>
                <div className={"submitter-container"}>
                    {this.renderForm()}
                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ParticipantsView);

