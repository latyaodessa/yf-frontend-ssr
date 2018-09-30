import React from 'react'
import {
    ADDITIONAL_PARTICIPANTS,
    HAIR_STYLIST,
    MODEL,
    MUA,
    PARTICIPANTS_TYPE,
    PHOTOGRAPHER,
    SET_DESIGNER,
    WARDROBE_STYLIST
} from "../../../../messages/submission";
import {Button, Dropdown, Grid} from 'semantic-ui-react'
import styles from './../styles.scss';
import {generateEmptyObject, getNewNumber} from "./FunctionServices";

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


const handleAddNewCard = (selectedType, props, handleAddCardEvent) => {
    switch (selectedType) {
        case MODEL:
            const modelNumber = getNewNumber(props.values.mds);
            const newMd = generateEmptyObject(modelNumber);
            props.values.mds.push(newMd);
            props.setValues(props.values);
            handleAddCardEvent(PARTICIPANTS_TYPE.mds.type + modelNumber);
            break;
        case PHOTOGRAPHER:
            const phNumber = getNewNumber(props.values.phs);
            const newPh = generateEmptyObject(phNumber);
            props.values.phs.push(newPh);
            props.setValues(props.values);
            handleAddCardEvent(PARTICIPANTS_TYPE.phs.type + phNumber);
            break;
        case MUA:
            const muaNumber = getNewNumber(props.values.muas);
            const newMua = generateEmptyObject(muaNumber);
            props.values.muas.push(newMua);
            props.setValues(props.values);
            handleAddCardEvent(PARTICIPANTS_TYPE.muas.type + muaNumber);
            break;
        case HAIR_STYLIST:
            const hairNumber = getNewNumber(props.values.hairStylists);
            const newHs = generateEmptyObject(hairNumber);
            props.values.hairStylists.push(newHs);
            props.setValues(props.values);
            handleAddCardEvent(PARTICIPANTS_TYPE.hairStylists.type + hairNumber);
            break;
        case WARDROBE_STYLIST:
            const wdNumber = getNewNumber(props.values.wardrobeStylists);
            const newWd = generateEmptyObject(wdNumber);
            props.values.wardrobeStylists.push(newWd);
            props.setValues(props.values);
            handleAddCardEvent(PARTICIPANTS_TYPE.wardrobeStylists.type + wdNumber);
            break;
        case SET_DESIGNER:
            const sdNumber = getNewNumber(props.values.setDesigner);
            const newSd = generateEmptyObject(sdNumber);
            props.values.setDesigner.push(newSd);
            props.setValues(props.values);
            handleAddCardEvent(PARTICIPANTS_TYPE.setDesigner.type + sdNumber);
            break;
        default:
            break;

    }

};


const handleDropDownOnSelect = (props, event, data, handleAddCardEvent) => {
    console.log(props);
    console.log(event);
    console.log(data.value);

    //
    // const values = props.values;
    // values.mds.push(generateEmptyObject(99));
    // props.setValues(values);

    // this.setState({selectedAdditional: ''});
    handleAddNewCard(data.value, props, handleAddCardEvent);
};

const AdditionalParticipantDropDown = ({handleAddCardEvent, props, state}) => {
    console.log(props);
    return <Grid>
        <style jsx>{styles}</style>
        <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className={"full-width-centered"}>
                <Dropdown placeholder={ADDITIONAL_PARTICIPANTS} fluid selection options={options}
                          value={state.selectedAdditional}
                          onChange={(evt, data) => handleDropDownOnSelect(props, event, data, handleAddCardEvent)} //TODO
                />

            </div>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
            <Button type="submit" content='Next' icon='right arrow' labelPosition='right'/>
        </Grid.Column>
    </Grid>

};

export default AdditionalParticipantDropDown;
