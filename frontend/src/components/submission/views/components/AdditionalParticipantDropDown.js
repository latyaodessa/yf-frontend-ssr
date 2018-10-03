import React from 'react'
import {
    ADDITIONAL_PARTICIPANTS,
    HAIR_STYLIST,
    MODEL,
    MUA,
    PHOTOGRAPHER,
    SET_DESIGNER,
    WARDROBE_STYLIST
} from "../../../../messages/submission";
import {Button, Dropdown, Grid} from 'semantic-ui-react'
import styles from './../styles.scss';

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

const AdditionalParticipantDropDown = ({handleAddCardEvent, props, state}) => {
    return <Grid>
        <style jsx>{styles}</style>
        <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className={"full-width-centered"}>
                <Dropdown placeholder={ADDITIONAL_PARTICIPANTS} fluid selection options={options}
                          value={state.selectedAdditional}
                          onChange={(evt, data) => handleAddCardEvent(data.value)}

                />

            </div>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
            <Button type="submit" content='Next' icon='right arrow' labelPosition='right'/>
        </Grid.Column>
    </Grid>

};

export default AdditionalParticipantDropDown;
