import React from 'react'
import styles from './../styles.scss'
import {Element} from 'react-scroll'
import {
    CHOOSE_SOCIAL,
    CITY,
    COUNTRY,
    FACEBOOK_DESCR,
    FIRST_NAME,
    FIRST_NAME_MODEL_DESCR,
    INSTAGRAM_DESCR,
    LAST_NAME,
    LAST_NAME_MODEL_DESCR,
    MODEL,
    PHOTOGRAPHER,
    VK_DESCR,
    PARTICIPANTS_TYPE, MUA, HAIR_STYLIST, SET_DESIGNER, WARDROBE_STYLIST
} from "../../../../messages/submission";
import {Form, Icon, Label} from 'semantic-ui-react'

const FIRST_REMOVAL_EXCEPTIONS = [PARTICIPANTS_TYPE.mds.type, PARTICIPANTS_TYPE.phs.type];

const handleDeleteCard = (selectedType, number) => {
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

// const CustomField = (props, name, label, placeholder, error, errorText) => {
//     return <Form.Field>
//         <Form.Input onChange={props.handleChange} fluid
//                     name=name
//                     label=label
//                     placeholder=placeholder/>
//         {error &&
//         <Label className={"validation-error-message"} basic pointing>
//             *{errorText}
//         </Label>}
//     </Form.Field>
// };

// {/*{CustomField(props,*/}
// {/*`${participantType.type}.${participant.number}.firstName`,*/}
// {/*FIRST_NAME, */}
// {/*FIRST_NAME_MODEL_DESCR, */}
// {/*props.errors[participantType.type] && props.errors[participantType.type][participant.number],*/}
// {/*props.errors["mds"][participant.number].firstName*/}
// {/*)}*/}

const ParticipantCardForm = ({participant, imgAddress, participantType, props, remove, index}) => {
        console.log(props);
        return <Element name={participantType.type + participant.number}>
            <style jsx>{styles}</style>
            <div className="login-form">
                <img src={imgAddress} className="login-profile-img"/>
                <div className="profile-container">
                    <div className={"header"}>
                        <div className={"left-side"}>{participantType.transcript}</div>
                        {!(FIRST_REMOVAL_EXCEPTIONS.includes(participantType.type) && participant.number === 0) &&
                        <div className="delete-container">
                            <img className="delete-button-img" src={"/static/img/icons/close-button-red.png"}
                                 onClick={() => remove(index)}
                            />
                        </div>
                        }
                    </div>
                    <div className={"card-style"}>
                    </div>

                    <Form.Group widths='equal'>

                        <Form.Field>
                            <Form.Input onChange={props.handleChange} fluid
                                        name={`${participantType.type}.${participant.number}.firstName`}
                                        label={FIRST_NAME}
                                        placeholder={FIRST_NAME_MODEL_DESCR}/>

                            {props.errors[participantType.type]
                            && props.errors[participantType.type][participant.number]
                            && props.errors[participantType.type][participant.number].firstName
                            && <Label style={{background: "#de6262", color: "#FFF"}} basic pointing>
                                *{props.errors[participantType.type][participant.number].firstName}
                            </Label>}
                        </Form.Field>

                        <Form.Field>
                            <Form.Input onChange={props.handleChange} fluid label={LAST_NAME}
                                        name={`${participantType.type}.${participant.number}.lastName`}
                                        placeholder={LAST_NAME_MODEL_DESCR}/>

                            {props.errors[participantType.type]
                            && props.errors[participantType.type][participant.number]
                            && props.errors[participantType.type][participant.number].lastName
                            && <Label style={{background: "#de6262", color: "#FFF"}}  basic pointing>
                                *{props.errors[participantType.type][participant.number].lastName}
                            </Label>}
                        </Form.Field>

                    </Form.Group>
                    <Form.Group unstackable widths={2}>


                        <Form.Field>
                            <Form.Input onChange={props.handleChange} label={COUNTRY} placeholder={COUNTRY}
                                        name={`${participantType.type}.${participant.number}.country`}/>

                            {props.errors[participantType.type]
                            && props.errors[participantType.type][participant.number]
                            && props.errors[participantType.type][participant.number].country
                            && <Label style={{background: "#de6262", color: "#FFF"}}  basic pointing>
                                *{props.errors[participantType.type][participant.number].country}
                            </Label>}
                        </Form.Field>


                        <Form.Field>
                            <Form.Input onChange={props.handleChange} label={CITY} placeholder={CITY}
                                        name={`${participantType.type}.${participant.number}.city`}/>

                            {props.errors[participantType.type]
                            && props.errors[participantType.type][participant.number]
                            && props.errors[participantType.type][participant.number].city
                            && <Label style={{background: "#de6262", color: "#FFF"}} basic pointing>
                                *{props.errors[participantType.type][participant.number].city}
                            </Label>}
                        </Form.Field>



                    </Form.Group>
                    <div className={"independent-label"}>
                        <Label pointing='below'>{CHOOSE_SOCIAL}</Label>
                    </div>
                    <Form.Input onChange={props.handleChange} fluid iconPosition='left' placeholder={INSTAGRAM_DESCR}
                                name={`${participantType.type}.${participant.number}.instagram`}>

                        <Icon name='instagram'/>
                        <input/>
                    </Form.Input>
                    <Form.Input onChange={props.handleChange} fluid iconPosition='left' placeholder={VK_DESCR}
                                name={`${participantType.type}.${participant.number}.vk`}>
                        <Icon name='vk'/>
                        <input/>
                    </Form.Input>
                    <Form.Input onChange={props.handleChange} fluid iconPosition='left' placeholder={FACEBOOK_DESCR}
                                name={`${participantType.type}.${participant.number}.facebook`}>
                        <Icon name='facebook official'/>
                        <input/>
                    </Form.Input>
                </div>
            </div>
        </Element>
    }
;

export default ParticipantCardForm;
