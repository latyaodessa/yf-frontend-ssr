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
    HAIR_STYLIST,
    INSTAGRAM_DESCR,
    LAST_NAME,
    LAST_NAME_MODEL_DESCR,
    MODEL,
    MUA,
    PARTICIPANTS_TYPE,
    PHOTOGRAPHER,
    SET_DESIGNER,
    VK_DESCR,
    WARDROBE_STYLIST
} from "../../../../messages/submission";
import {Form, Icon, Label} from 'semantic-ui-react'
import {generateEmptyObject} from "./FunctionServices";
import {connect} from "react-redux";

const FIRST_REMOVAL_EXCEPTIONS = [PARTICIPANTS_TYPE.mds.type, PARTICIPANTS_TYPE.phs.type];

class ParticipantCardForm extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            mds: [
                generateEmptyObject(0)
            ],
            phs: [
                generateEmptyObject(0)
            ],
            muas: [],
            hairStylists: [],
            setDesigner: [],
            wardrobeStylists: [],
            selectedAdditional: '',
            scrollToElement: ''
        };

    }


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

    renderInputFieldWithValidation = (name, label, descr) => {
        return <Form.Field>
            <Form.Input
                fluid
                name={name}
                label={label}
                placeholder={descr}/>

            {this.props.errors
            && this.props.errors[name]
            && <Label style={{background: "#de6262", color: "#FFF"}} basic pointing>
                *{this.props.errors[name]}
            </Label>}
        </Form.Field>
    };

    render() {

        return (
            <Element name={this.props.participantType.type + this.props.participant.number}>
                <style jsx>{styles}</style>
                <div className="login-form">
                    <img src={this.props.imgAddress} className="login-profile-img"/>
                    <div className="profile-container">
                        <div className={"header"}>
                            <div className={"left-side"}>{this.props.participantType.transcript}</div>
                            {!(FIRST_REMOVAL_EXCEPTIONS.includes(this.props.participantType.type) && this.props.participant.number === 0) &&
                            <div className="delete-container">
                                <img className="delete-button-img" src={"/static/img/icons/close-button-red.png"}
                                     onClick={() => this.props.handleDeleteCardEvent(this.props.participantType.type, this.props.participant.number)}
                                />
                            </div>
                            }
                        </div>
                        <div className={"card-style"}>
                        </div>

                        <Form.Group widths='equal'>

                            {this.renderInputFieldWithValidation(
                                `${this.props.participantType.type}.${this.props.participant.number}.firstName`,
                                FIRST_NAME,
                                FIRST_NAME_MODEL_DESCR)
                            }

                            {this.renderInputFieldWithValidation(
                                `${this.props.participantType.type}.${this.props.participant.number}.lastName`,
                                LAST_NAME,
                                LAST_NAME_MODEL_DESCR)
                            }

                        </Form.Group>
                        <Form.Group unstackable widths={2}>

                            {this.renderInputFieldWithValidation(
                                `${this.props.participantType.type}.${this.props.participant.number}.country`,
                                COUNTRY,
                                COUNTRY)
                            }

                            {this.renderInputFieldWithValidation(
                                `${this.props.participantType.type}.${this.props.participant.number}.city`,
                                CITY,
                                CITY)
                            }


                        </Form.Group>
                        <div className={"independent-label"}>
                            <Label pointing='below'>{CHOOSE_SOCIAL}</Label>
                        </div>
                        <Form.Input
                            fluid iconPosition='left' placeholder={INSTAGRAM_DESCR}
                            name={`${this.props.participantType.type}.${this.props.participant.number}.instagram`}>

                            <Icon name='instagram'/>
                            <input/>
                        </Form.Input>
                        <Form.Input
                            fluid iconPosition='left' placeholder={VK_DESCR}
                            name={`${this.props.participantType.type}.${this.props.participant.number}.vk`}>
                            <Icon name='vk'/>
                            <input/>
                        </Form.Input>
                        <Form.Input
                            fluid iconPosition='left' placeholder={FACEBOOK_DESCR}
                            name={`${this.props.participantType.type}.${this.props.participant.number}.facebook`}>
                            <Icon name='facebook official'/>
                            <input/>
                        </Form.Input>
                    </div>
                </div>
            </Element>

        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ParticipantCardForm);
