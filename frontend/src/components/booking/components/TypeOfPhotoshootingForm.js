import React from 'react';
import './style.css';
import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'

function TypeOfPhotoshootingForm() {

    const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
        key: addressDefinitions.state_abbr[index],
        text: state,
        value: addressDefinitions.state_abbr[index],
    }))



    return <div style={style.container}>
        <Dropdown
            placeholder='State'
            fluid
            multiple
            search
            selection
            options={stateOptions}
        />

    </div>;
}

const style = {
    container: {
        display: "flex",
        flexGrow: 1
    }
};

export default (TypeOfPhotoshootingForm);
