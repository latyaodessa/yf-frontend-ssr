import React from 'react'
import {Grid} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import styles from './../styles.scss';
import {PARTICIPANTS_TYPE} from "../../../../messages/submission";
import ParticipantCardForm from './ParticipantCardForm';


const renderCardGrid = (participantType, arrayParticipants, thumbnail, handleDeleteCardEvent, handleChangeEvent, errors, updateMeta) => {
    return <Grid>
        <style jsx>{styles}</style>
        {arrayParticipants.map((p, index) => {
            return <Grid.Column textAlign='left' key={index} mobile={16} tablet={16} computer={16}>
                <ParticipantCardForm participant={p} imgAddress={thumbnail} participantType={participantType}
                                     index={index} handleDeleteCardEvent={handleDeleteCardEvent}
                                     handleChangeEvent={handleChangeEvent}
                                     errors={errors}
                                     updateMeta={updateMeta}/>
            </Grid.Column>
        })}

    </Grid>
};


const ParticipantsForm = ({state, handleDeleteCardEvent, handleChangeEvent, updateMeta}) => {
    return <Grid>
        {state.mds && state.mds.length !== 0 &&
        <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.mds, state.mds, "/static/img/icons/woman-black.png", handleDeleteCardEvent, handleChangeEvent, state.errors, updateMeta)}
        </Grid.Column>}
        {state.phs && state.phs.length !== 0 &&
        <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.phs, state.phs, "/static/img/icons/photo-camera-black.png", handleDeleteCardEvent, handleChangeEvent, state.errors, updateMeta)}
        </Grid.Column>}
        {state.muas && state.muas.length !== 0 &&
        <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.muas, state.muas, "/static/img/icons/mascara.png", handleDeleteCardEvent, handleChangeEvent, state.errors, updateMeta)}
        </Grid.Column>}
        {state.hairStylists && state.hairStylists.length !== 0 &&
        <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.hairStylists, state.hairStylists, "/static/img/icons/salon.png", handleDeleteCardEvent, handleChangeEvent, state.errors, updateMeta)}
        </Grid.Column>}
        {state.wardrobeStylists && state.wardrobeStylists.length !== 0 &&
        <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.wardrobeStylists, state.wardrobeStylists, "/static/img/icons/hanger.png", handleDeleteCardEvent, handleChangeEvent, state.errors, updateMeta)}
        </Grid.Column>}
        {state.setDesigner && state.setDesigner.length !== 0 &&
        <Grid.Column mobile={16} tablet={8} computer={8}>
            {renderCardGrid(PARTICIPANTS_TYPE.setDesigner, state.setDesigner, "/static/img/icons/hands-framing.png", handleDeleteCardEvent, handleChangeEvent, state.errors, updateMeta)}
        </Grid.Column>}

    </Grid>
};

export default ParticipantsForm;
