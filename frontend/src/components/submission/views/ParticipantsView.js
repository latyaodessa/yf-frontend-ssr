import React from 'react'
import {connect} from "react-redux";
import {Events, scroller, scrollSpy} from 'react-scroll'
import {Form, Grid} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import styles from './styles.scss'
import {generateEmptyObject, getNewNumber} from "./components/FunctionServices";
import {
    ERROR_REQUIRED_FIELD,
    HAIR_STYLIST,
    MODEL,
    MUA,
    PARTICIPANTS_TYPE,
    PHOTOGRAPHER,
    SET_DESIGNER,
    WARDROBE_STYLIST
} from "../../../messages/submission";
import ParticipantsForm from './components/ParticipantsForm';
import AdditionalParticipantDropDown from './components/AdditionalParticipantDropDown';


class ParticipantsView extends React.Component {

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
            scrollToElement: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.commitForm = this.commitForm.bind(this);

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


    handleAddCardEvent = (selectedType) => {

        switch (selectedType) {
            case MODEL:
                const modelNumber = getNewNumber(this.state.mds);
                const newMd = generateEmptyObject(modelNumber);
                this.setState({
                    mds: [...this.state.mds, newMd],
                    scrollToElement: PARTICIPANTS_TYPE.mds.type + modelNumber
                });
                break;
            case PHOTOGRAPHER:
                const phNumber = getNewNumber(this.state.phs);
                const newPh = generateEmptyObject(phNumber);
                this.setState({
                    phs: [...this.state.phs, newPh],
                    scrollToElement: PARTICIPANTS_TYPE.phs.type + phNumber
                });
                break;
            case MUA:
                const muaNumber = getNewNumber(this.state.muas);
                const newMua = generateEmptyObject(muaNumber);
                this.setState({
                    muas: [...this.state.muas, newMua],
                    scrollToElement: PARTICIPANTS_TYPE.muas.type + muaNumber
                });
                break;
            case HAIR_STYLIST:
                const hairNumber = getNewNumber(this.state.hairStylists);
                const newHs = generateEmptyObject(hairNumber);
                this.setState({
                    hairStylists: [...this.state.hairStylists, newHs],
                    scrollToElement: PARTICIPANTS_TYPE.hairStylists.type + hairNumber
                });
                break;
            case WARDROBE_STYLIST:
                const wdNumber = getNewNumber(this.state.wardrobeStylists);
                const newWd = generateEmptyObject(wdNumber);
                this.setState({
                    wardrobeStylists: [...this.state.wardrobeStylists, newWd],
                    scrollToElement: PARTICIPANTS_TYPE.wardrobeStylists.type + wdNumber
                });
                break;
            case SET_DESIGNER:
                const sdNumber = getNewNumber(this.state.setDesigner);
                const newSd = generateEmptyObject(sdNumber);
                this.setState({
                    setDesigner: [...this.state.setDesigner, newSd],
                    scrollToElement: PARTICIPANTS_TYPE.setDesigner.type + sdNumber
                });
                break;
            default:
                break;

        }

    };

    handleDeleteCardEvent = (selectedType, number) => {
        switch (selectedType) {
            case PARTICIPANTS_TYPE.mds.type:
                this.setState({
                    mds: this.state.mds.filter(p => p.number !== number)
                });
                break;
            case PARTICIPANTS_TYPE.phs.type:
                this.setState({
                    phs: this.state.phs.filter(p => p.number !== number)
                });
                break;
            case PARTICIPANTS_TYPE.muas.type:
                this.setState({
                    muas: this.state.muas.filter(p => p.number !== number)
                });
                break;
            case PARTICIPANTS_TYPE.hairStylists.type:
                this.setState({
                    hairStylists: this.state.hairStylists.filter(p => p.number !== number)
                });
                break;
            case PARTICIPANTS_TYPE.wardrobeStylists.type:
                this.setState({
                    wardrobeStylists: this.state.wardrobeStylists.filter(p => p.number !== number)

                });
                break;
            case PARTICIPANTS_TYPE.setDesigner.type:
                this.setState({
                    setDesigner: this.state.setDesigner.filter(p => p.number !== number)
                });
                break;
            default:
                break;

        }

    };

    handleChangeEvent = (selectedType, index, field, evt) => {

        let participants = this.state[selectedType];
        participants[index][field] = evt.target.value;

        this.setState({
            [selectedType]: participants
        });


    };


    execScrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 800,
            delay: 0,
            smooth: true
        })
    };


    handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        let participants = {};

        await Promise.all([PARTICIPANTS_TYPE.mds.type,
            PARTICIPANTS_TYPE.phs.type,
            PARTICIPANTS_TYPE.muas.type,
            PARTICIPANTS_TYPE.hairStylists.type,
            PARTICIPANTS_TYPE.wardrobeStylists.type,
            PARTICIPANTS_TYPE.setDesigner.type]
            .map(async type => await this.commitForm(type, e)
                .then(async prtc => {
                    participants[type] = prtc;
                    await this.validate(type, prtc).then(err => {
                        errors = Object.assign(errors, err);
                    });
                })
            ));

        this.setState({
            mds: participants[PARTICIPANTS_TYPE.mds.type],
            phs: participants[PARTICIPANTS_TYPE.phs.type],
            muas: participants[PARTICIPANTS_TYPE.muas.type],
            hairStylists: participants[PARTICIPANTS_TYPE.hairStylists.type],
            setDesigner: participants[PARTICIPANTS_TYPE.setDesigner.type],
            wardrobeStylists: participants[PARTICIPANTS_TYPE.wardrobeStylists.type],
            errors: errors
        });

    };

    commitForm = async (type, e) => {
        let participants = [];
        await this.state[type].map(p => {
            participants.push({
                number: p.number,
                firstName: e.target[`${type}.${p.number}.firstName`].value,
                lastName: e.target[`${type}.${p.number}.lastName`].value,
                country: e.target[`${type}.${p.number}.country`].value,
                city: e.target[`${type}.${p.number}.city`].value,
                instagram: e.target[`${type}.${p.number}.instagram`].value,
                vk: e.target[`${type}.${p.number}.vk`].value,
                facebook: e.target[`${type}.${p.number}.facebook`].value,
                me: false
            });
        });
        return participants;
    };

    validate = async (type, participants) => {
        let errors = {};
        await participants.map(p => {
            if (this.isBlank(p.firstName)) {
                errors[`${type}.${p.number}.firstName`] = ERROR_REQUIRED_FIELD;
            }
            if (this.isBlank(p.lastName)) {
                errors[`${type}.${p.number}.lastName`] = ERROR_REQUIRED_FIELD;
            }
            if (this.isBlank(p.country)) {
                errors[`${type}.${p.number}.country`] = ERROR_REQUIRED_FIELD;
            }
            if (this.isBlank(p.city)) {
                errors[`${type}.${p.number}.city`] = ERROR_REQUIRED_FIELD;
            }
        });
        return errors;
    };

    isBlank = (str) => {
        return (!str || /^\s*$/.test(str));
    };

    render() {
        return (
            <div>
                <style jsx>{styles}</style>
                <div className={"submitter-container"}>
                    <Form onSubmit={this.handleSubmit}>
                        <ParticipantsForm state={this.state}
                                          handleDeleteCardEvent={this.handleDeleteCardEvent}
                                          handleChangeEvent={this.handleChangeEvent}/>
                        <Grid>
                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                <AdditionalParticipantDropDown handleAddCardEvent={this.handleAddCardEvent}
                                                               state={this.state}/>
                            </Grid.Column>
                            <input type="submit" value="Submit" onClick={(e) => this.handleSubmit(e)}/>
                        </Grid>

                    </Form>
                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ParticipantsView);

