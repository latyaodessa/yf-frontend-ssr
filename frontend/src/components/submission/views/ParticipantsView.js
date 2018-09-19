import React from 'react'
import {connect} from "react-redux";
import {Formik, Form as FormFormik, Field} from 'formik';
import {Element, Events, scroller, scrollSpy} from 'react-scroll'
import * as Yup from 'yup'
import {Button, Dropdown, Form, Grid, Icon, Label} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import styles from './styles.scss'
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
            mds: [
                this.generateEmptyObject(1)
            ],
            phs: [
                this.generateEmptyObject(1)
            ],
            muas: [],
            hairStylists: [],
            setDesigner: [],
            wardrobeStylists: [],
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

    handleAddNewCard = (selectedType) => {
        switch (selectedType) {
            case MODEL:
                const modelNumber = this.getNewNumber(this.state.mds);
                const newMd = this.generateEmptyObject(modelNumber);
                this.setState({
                    mds: [...this.state.mds, newMd],
                    scrollToElement: selectedType + modelNumber
                });
                break;
            case PHOTOGRAPHER:
                const phNumber = this.getNewNumber(this.state.phs);
                const newPh = this.generateEmptyObject(phNumber);
                this.setState({
                    phs: [...this.state.phs, newPh],
                    scrollToElement: selectedType + phNumber
                });
                break;
            case MUA:
                const muaNumber = this.getNewNumber(this.state.muas);
                const newMua = this.generateEmptyObject(muaNumber);
                this.setState({
                    muas: [...this.state.muas, newMua],
                    scrollToElement: selectedType + muaNumber
                });
                break;
            case HAIR_STYLIST:
                const hairNumber = this.getNewNumber(this.state.hairStylists);
                const newHs = this.generateEmptyObject(hairNumber);
                this.setState({
                    hairStylists: [...this.state.hairStylists, newHs],
                    scrollToElement: selectedType + hairNumber
                });
                break;
            case WARDROBE_STYLIST:
                const wdNumber = this.getNewNumber(this.state.wardrobeStylists);
                const newWd = this.generateEmptyObject(wdNumber);
                this.setState({
                    wardrobeStylists: [...this.state.wardrobeStylists, newWd],
                    scrollToElement: selectedType + wdNumber
                });
                break;
            case SET_DESIGNER:
                const sdNumber = this.getNewNumber(this.state.setDesigner);
                const newSd = this.generateEmptyObject(sdNumber);
                this.setState({
                    setDesigner: [...this.state.setDesigner, newSd],
                    scrollToElement: selectedType + sdNumber
                });
                break;
            default:
                break;

        }

    };

    getNewNumber = (array) => {
        if (array.length === 0) {
            return 1;
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

    renderCardForm(participant, imgAddress, type) {
        return <Element name={type + participant.number}>
            <style jsx>{styles}</style>
            <div className="login-form">
                <img src={imgAddress} className="login-profile-img"/>
                <div className="profile-container">
                    <div className={"header"}>
                        <div className={"left-side"}>{type}</div>
                        {!(FIRST_REMOVAL_EXCEPTIONS.includes(type) && participant.number === 1) &&
                        <div className="delete-container">
                            <img className="delete-button-img" src={"/static/img/icons/close-button-red.png"}
                                 onClick={this.handleDeleteCard.bind(this, type, participant.number)}/>
                        </div>
                        }
                    </div>
                    <div className={"card-style"}>
                    </div>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label={FIRST_NAME} placeholder={FIRST_NAME_MODEL_DESCR}/>
                        <Form.Input fluid label={LAST_NAME} placeholder={LAST_NAME_MODEL_DESCR}/>
                    </Form.Group>
                    <Form.Group unstackable widths={2}>
                        <Form.Input label={COUNTRY} placeholder={COUNTRY}/>
                        <Form.Input label={CITY} placeholder={CITY}/>
                    </Form.Group>
                    <div className={"independent-label"}>
                        <Label pointing='below'>{CHOOSE_SOCIAL}</Label>
                    </div>
                    <Form.Input fluid iconPosition='left' placeholder={INSTAGRAM_DESCR}>

                        <Icon name='instagram'/>
                        <input/>
                    </Form.Input>
                    <Form.Input fluid iconPosition='left' placeholder={VK_DESCR}>
                        <Icon name='vk'/>
                        <input/>
                    </Form.Input>
                    <Form.Input fluid iconPosition='left' placeholder={FACEBOOK_DESCR}>
                        <Icon name='facebook official'/>
                        <input/>
                    </Form.Input>
                </div>
            </div>
        </Element>
    }


    renderCardGrid = (type, arrayParticipants, thumbnail, buttonText) => {
        return <Grid>
            <style jsx>{styles}</style>
            {arrayParticipants.map(p => {
                return <Grid.Column key={p.number} mobile={16} tablet={16} computer={16}>
                    {this.renderCardForm(p, thumbnail, type)}
                </Grid.Column>
            })}

            <Grid.Column mobile={16} tablet={16} computer={16}>
                <div className={"centered"}>
                    <Button onClick={this.handleAddNewCard.bind(this, type)} icon labelPosition='left'>
                        <Icon name='plus'/>
                        {buttonText}
                    </Button>
                </div>
            </Grid.Column>
        </Grid>
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


    renderFormContent = () => {
        return <Grid>
            {this.state.mds && this.state.mds.length !== 0 && <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(MODEL, this.state.mds, "/static/img/icons/woman-black.png", ADD_MD_BUTTON)}
            </Grid.Column>}
            {this.state.phs && this.state.phs.length !== 0 && <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(PHOTOGRAPHER, this.state.phs, "/static/img/icons/photo-camera-black.png", ADD_PH_BUTTON)}
            </Grid.Column>}
            {this.state.muas && this.state.muas.length !== 0 && <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(MUA, this.state.muas, "/static/img/icons/mascara.png", ADD_MUA)}
            </Grid.Column>}
            {this.state.hairStylists && this.state.hairStylists.length !== 0 &&
            <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(HAIR_STYLIST, this.state.hairStylists, "/static/img/icons/salon.png", ADD_HAIR_STYLIST)}
            </Grid.Column>}
            {this.state.wardrobeStylists && this.state.wardrobeStylists.length !== 0 &&
            <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(WARDROBE_STYLIST, this.state.wardrobeStylists, "/static/img/icons/hanger.png", ADD_WARDROBE_STYLIST)}
            </Grid.Column>}
            {this.state.setDesigner && this.state.setDesigner.length !== 0 &&
            <Grid.Column mobile={16} tablet={8} computer={8}>
                {this.renderCardGrid(SET_DESIGNER, this.state.setDesigner, "/static/img/icons/hands-framing.png", ADD_SET_DESIGNER)}
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
                    this.generateEmptyObject(1)
                ],
                phs: [
                    this.generateEmptyObject(1)
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
                    {this.renderFormContent()}
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

