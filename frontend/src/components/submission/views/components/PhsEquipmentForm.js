import React from 'react'
import {Form, TextArea} from 'semantic-ui-react'


const PhsEquipmentForm = (props) => {

    return <Form>
        <TextArea name="description" onChange={props.handleChange} autoHeight placeholder='Try adding multiple lines'/>
    </Form>
};

export default PhsEquipmentForm;
