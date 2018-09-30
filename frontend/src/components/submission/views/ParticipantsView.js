import React from 'react'
import mapValues from 'lodash/mapValues';
import {connect} from "react-redux";
import {Debug, Formik} from 'formik';
import {Events, scroller, scrollSpy} from 'react-scroll'
import {Button, Form, Grid} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import styles from './styles.scss'
import * as Yup from 'yup';
import {generateEmptyObject, getNewNumber} from "./components/FunctionServices";
import AdditionalParticipantDropDown from './components/AdditionalParticipantDropDown';
import {PARTICIPANTS_TYPE, ERROR_REQUIRED_FIELD} from "../../../messages/submission";
import ParticipantsForm from './components/ParticipantsForm';

import {HAIR_STYLIST, MODEL, MUA, PHOTOGRAPHER, SET_DESIGNER, WARDROBE_STYLIST} from "../../../messages/submission";


class ParticipantsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            participants: {
                mds: [
                    generateEmptyObject(0)
                ],
                phs: [
                    generateEmptyObject(0)
                ],
                muas: [],
                hairStylists: [],
                setDesigner: [],
                wardrobeStylists: []
            },
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


    handleAddCardEvent = (cardId) => {
        this.setState({scrollToElement: cardId})

    };


    execScrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 800,
            delay: 0,
            smooth: true
        })
    };

    buildRepeatingValidations = (object, type, number) => {
        object[`${type}.${number}.firstName`] = Yup.string()
            .required(ERROR_REQUIRED_FIELD);
        object[`${type}.${number}.lastName`] = Yup.string()
            .required(ERROR_REQUIRED_FIELD);
        object[`${type}.${number}.country`] = Yup.string()
            .required(ERROR_REQUIRED_FIELD);
        object[`${type}.${number}.city`] = Yup.string()
            .required(ERROR_REQUIRED_FIELD);
    };

    // object[`${PARTICIPANTS_TYPE.mds.type}.${value.number}.firstName`] = Yup.string()
    //     .required(ERROR_REQUIRED_FIELD);
    // object[`${PARTICIPANTS_TYPE.mds.type}.${value.number}.lastName`] = Yup.string()
    //     .required(ERROR_REQUIRED_FIELD);
    // object[`${PARTICIPANTS_TYPE.mds.type}.${value.number}.country`] = Yup.string()
    //     .required(ERROR_REQUIRED_FIELD);
    // object[`${PARTICIPANTS_TYPE.mds.type}.${value.number}.city`] = Yup.string()
    //     .required(ERROR_REQUIRED_FIELD);


    buildValidationSchema = async (values) => {

        console.log(values);

        let object = {};

        await values.mds.map(value => {
            this.buildRepeatingValidations(object, PARTICIPANTS_TYPE.mds.type, value.number);
        });
        await values.phs.map(value => {
            this.buildRepeatingValidations(object, PARTICIPANTS_TYPE.phs.type, value.number);
        });
        await values.muas.map(value => {
            this.buildRepeatingValidations(object, PARTICIPANTS_TYPE.muas.type, value.number);
        });
        await values.hairStylists.map(value => {
            this.buildRepeatingValidations(object, PARTICIPANTS_TYPE.hairStylists.type, value.number);
        });
        await values.setDesigner.map(value => {
            this.buildRepeatingValidations(object, PARTICIPANTS_TYPE.setDesigner.type, value.number);
        });
        await values.wardrobeStylists.map(value => {
            this.buildRepeatingValidations(object, PARTICIPANTS_TYPE.wardrobeStylists.type, value.number);
        });
        console.log("OuT");
        console.log(object);
        return Yup.object().shape(object);


        // return Yup.object(mapValues(values, async (valueArray, key) => {
        //     console.log(valueArray);
        //     console.log(key);
        //     let object = {};
        //
        //     await valueArray.map(value => {
        //         this.buildRepeatingValidations(object, key, value.number);
        //     });
        //     console.log(object);
        //     return Yup.object(object);
        //
        //
        // }))
    };


    render() {
        // console.log(this.state);
        // console.log("VIEW RENDER");


        return (
            <div>
                <style jsx>{styles}</style>
                <div className={"submitter-container"}>
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={this.state.participants}
                        // validationSchema={props => {
                        //     console.log(props);
                        //     return Yup.lazy(values => {
                        //         return this.buildValidationSchema(values);
                        //
                        //     })
                        // }}
                        validationSchema={Yup.object().shape({
                            "mds.0.firstName": Yup.string().required('Email is required!')
                        })}
                        onSubmit={values => {
                            console.log(values);
                        }}
                        render={props => (
                            <Form onSubmit={props.handleSubmit}>
                                {/*{console.log("render form")}*/}
                                <ParticipantsForm props={props} state={this.state}
                                                  handleAddCardEvent={this.handleAddCardEvent}/>
                            </Form>
                        )}

                    />
                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ParticipantsView);

