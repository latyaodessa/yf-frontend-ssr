import React from 'react'
import {Debug, FieldArray} from 'formik';
import {Button, Grid, Icon} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import styles from './../styles.scss';
import {ADD_MD_BUTTON, PARTICIPANTS_TYPE, ADD_PH_BUTTON, ADD_MUA, ADD_HAIR_STYLIST, ADD_WARDROBE_STYLIST, ADD_SET_DESIGNER} from "../../../../messages/submission";
import ParticipantCardForm from './ParticipantCardForm';
import AdditionalParticipantDropDown from './AdditionalParticipantDropDown';
import {generateEmptyObject, getNewNumber} from "./FunctionServices";


// const handleAddNewCard = (push, selectedType, arrayParticipants) => {
//     console.log(push);
//     switch (selectedType) {
//         case PARTICIPANTS_TYPE.mds.type:
//             const modelNumber = getNewNumber(arrayParticipants);
//             const newMd = generateEmptyObject(modelNumber);
//             push(newMd);
//             // this.setState({
//             //     scrollToElement: selectedType + modelNumber
//             // });
//             break;
//         case PARTICIPANTS_TYPE.phs.type:
//             const phNumber = getNewNumber(arrayParticipants);
//             const newPh = generateEmptyObject(phNumber);
//             push(newPh);
//             this.setState({
//                 scrollToElement: selectedType + phNumber
//             });
//             break;
//         case PARTICIPANTS_TYPE.muas.type:
//             const muaNumber = getNewNumber(arrayParticipants);
//             const newMua = generateEmptyObject(muaNumber);
//             push(newMua);
//             this.setState({
//                 scrollToElement: selectedType + muaNumber
//             });
//             break;
//         case PARTICIPANTS_TYPE.hairStylists.type:
//             const hairNumber = getNewNumber(arrayParticipants);
//             const newHs = generateEmptyObject(hairNumber);
//             push(newHs);
//             this.setState({
//                 scrollToElement: selectedType + hairNumber
//             });
//             break;
//         case PARTICIPANTS_TYPE.wardrobeStylists.type:
//             const wdNumber = getNewNumber(arrayParticipants);
//             const newWd = generateEmptyObject(wdNumber);
//             push(newWd);
//             this.setState({
//                 scrollToElement: selectedType + wdNumber
//             });
//             break;
//         case PARTICIPANTS_TYPE.setDesigner.type:
//             const sdNumber = getNewNumber(arrayParticipants);
//             const newSd = generateEmptyObject(sdNumber);
//             push(newSd);
//             this.setState({
//                 scrollToElement: selectedType + sdNumber
//             });
//             break;
//         default:
//             break;
//
//     }
//
// };

const renderCardGrid = (participantType, arrayParticipants, thumbnail, buttonText, props) => {

    return <FieldArray
        name={participantType.type}
        render={helper => (
            <Grid>
                <style jsx>{styles}</style>
                {arrayParticipants.map((p, index) => {
                    return <Grid.Column key={index} mobile={16} tablet={16} computer={16}>
                        <ParticipantCardForm participant={p} imgAddress={thumbnail} participantType={participantType}
                                             props={props} remove={helper.remove} index={index}/>
                    </Grid.Column>
                })}

                {/*<Grid.Column mobile={16} tablet={16} computer={16}>*/}
                    {/*<div className={"centered"}>*/}
                        {/*<Button type="button"*/}
                                {/*onClick={handleAddNewCard.bind(this, helper.push, participantType.type, arrayParticipants)}*/}
                                {/*icon*/}
                                {/*labelPosition='left'>*/}
                            {/*<Icon name='plus'/>*/}
                            {/*{buttonText}*/}
                        {/*</Button>*/}
                    {/*</div>*/}
                {/*</Grid.Column>*/}
            </Grid>
        )}/>

};


const ParticipantsForm = ({props, state, handleAddCardEvent}) => {
    return <Grid>
        {props.values.mds && props.values.mds.length !== 0 && <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.mds, props.values.mds, "/static/img/icons/woman-black.png", ADD_MD_BUTTON, props)}
        </Grid.Column>}
        {props.values.phs && props.values.phs.length !== 0 && <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.phs, props.values.phs, "/static/img/icons/photo-camera-black.png", ADD_PH_BUTTON, props)}
        </Grid.Column>}
        {props.values.muas && props.values.muas.length !== 0 &&
        <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.muas, props.values.muas, "/static/img/icons/mascara.png", ADD_MUA, props)}
        </Grid.Column>}
        {props.values.hairStylists && props.values.hairStylists.length !== 0 &&
        <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.hairStylists, props.values.hairStylists, "/static/img/icons/salon.png", ADD_HAIR_STYLIST, props)}
        </Grid.Column>}
        {props.values.wardrobeStylists && props.values.wardrobeStylists.length !== 0 &&
        <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.wardrobeStylists, props.values.wardrobeStylists, "/static/img/icons/hanger.png", ADD_WARDROBE_STYLIST, props)}
        </Grid.Column>}
        {props.values.setDesigner && props.values.setDesigner.length !== 0 &&
        <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.setDesigner, props.values.setDesigner, "/static/img/icons/hands-framing.png", ADD_SET_DESIGNER, props)}
        </Grid.Column>}
        <Grid.Column mobile={16} tablet={16} computer={16}>
            <AdditionalParticipantDropDown props={props} handleAddCardEvent={handleAddCardEvent} state={state}/>
        </Grid.Column>
    </Grid>
};

export default ParticipantsForm;
