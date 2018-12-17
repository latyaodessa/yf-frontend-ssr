import React from "react";
import Modal from 'react-modal';
import {Loader} from 'semantic-ui-react'

class ModalLoader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                isOpen={this.props.showLoader}
                style={customStyles}
            >
                <Loader size='large' active inline='centered'/>
            </Modal>)
    }

}

export default ModalLoader;

const customStyles = {
    content: {
        background: 'transparent',
        margin: '0',
        transform: 'none',
        borderRadius: 0,
        padding: "20px",
        border: 'none',
        position: 'initial'
    },
    overlay: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        background: 'transparent',
        transform: "translate(-50%, -50%)"
    }
};
