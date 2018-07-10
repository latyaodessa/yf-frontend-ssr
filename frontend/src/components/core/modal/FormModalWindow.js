import React from "react";
import Modal from 'react-modal';
import FullWidthForm from "../form/forms/FullWidthForm";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        background: 'rgb(255, 255, 255)',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
        borderRadius: 0,
        border: 'none',
        padding: '10px 20px 10px 20px'
    },
    overlay: {
        background: 'rgba(78, 77, 77, 0.75)'
    }
};
Modal.setAppElement("#__next");

class FormModalWindow extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            showPopUp: this.props.showPopUp
        };


    }

    componentDidUpdate(prevProps) {
        if (prevProps.showPopUp !== this.props.showPopUp) {
            this.setState({showPopUp: this.props.showPopUp});
        }
    }


    render() {
        return (
            <Modal
                isOpen={this.state.showPopUp}
                onRequestClose={this.props.close}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <FullWidthForm handleSubmit={this.props.handleSubmit} title={this.props.popupTitle}>
                    {this.props.children}
                </FullWidthForm>
            </Modal>
        )
    }
}


export default FormModalWindow;
