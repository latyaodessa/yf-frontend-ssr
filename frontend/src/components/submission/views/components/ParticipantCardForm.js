import React from 'react'
import styles from './../styles.scss'
import {Element} from 'react-scroll'
import {
    CITY,
    COUNTRY,
    FIRST_NAME,
    INSTAGRAM_DESCR,
    IT_IS_ME,
    LAST_NAME,
    PARTICIPANTS_TYPE
} from "../../../../messages/submission";
import {Checkbox, Form, Icon, Label} from 'semantic-ui-react'
import {connect} from "react-redux";
import {searchCountry} from "../../../../actions/metaActions";

const FIRST_REMOVAL_EXCEPTIONS = [PARTICIPANTS_TYPE.mds.type, PARTICIPANTS_TYPE.phs.type];

class ParticipantCardForm extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            countries: ""
        };

    }

    componentDidMount() {

        this.props.dispatch(searchCountry()).then(() => {
            this.setState({
                countries: this.props.country.data.map(cntr => {
                    return {key: cntr.id, value: cntr.titleRu, text: cntr.titleRu}
                })
            })
        })
    }


    renderInputFieldWithValidation = (name, label, descr, defalutValue) => {
        return <Form.Field>
            <Form.Input
                fluid
                name={name}
                label={label}
                placeholder={descr}
                defaultValue={defalutValue}
            />

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
                                FIRST_NAME,
                                this.props.participant.firstName)
                            }

                            {this.renderInputFieldWithValidation(
                                `${this.props.participantType.type}.${this.props.participant.number}.lastName`,
                                LAST_NAME,
                                LAST_NAME,
                                this.props.participant.lastName)
                            }

                        </Form.Group>
                        <Form.Group unstackable widths={2}>


                            {this.renderInputFieldWithValidation(
                                `${this.props.participantType.type}.${this.props.participant.number}.country`,
                                COUNTRY,
                                COUNTRY,
                                this.props.participant.country)
                            }


                            {this.renderInputFieldWithValidation(
                                `${this.props.participantType.type}.${this.props.participant.number}.city`,
                                CITY,
                                CITY,
                                this.props.participant.city)
                            }


                        </Form.Group>

                        <Form.Group widths='equal'>

                            <Form.Input label={""}
                                        fluid iconPosition='left' placeholder={INSTAGRAM_DESCR}
                                        name={`${this.props.participantType.type}.${this.props.participant.number}.instagram`}
                                        defaultValue={this.props.participant.instagram}>

                                <Icon name='instagram'/>
                                <input/>
                            </Form.Input>

                        </Form.Group>

                        <Form.Group widths='equal'>

                            <Form.Field>
                                <Checkbox
                                    name={`${this.props.participantType.type}.${this.props.participant.number}.me`}
                                    label={IT_IS_ME}
                                />
                                <div className={"checkbox-error"}>
                                    {this.props.errors
                                    && this.props.errors.isMeChecked
                                    && <Label style={{background: "#de6262", color: "#FFF"}} basic pointing>
                                        *{this.props.errors.isMeChecked}
                                    </Label>}
                                </div>
                            </Form.Field>
                        </Form.Group>
                    </div>
                </div>
            </Element>

        )
    }
}

function mapStateToProps(state) {
    const {country} = state;


    return {country: country};
}

export default connect(mapStateToProps)(ParticipantCardForm);
