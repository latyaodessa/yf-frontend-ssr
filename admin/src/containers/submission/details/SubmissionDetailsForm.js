import React from 'react'
import {connect} from 'react-redux'
import {getSubmissionByUUid, updateSubmission, publishSubmission} from "../../../actions/SubmissionActions";
import {bindActionCreators} from "redux";
import {Button, Dropdown, Form, List, TextArea} from 'semantic-ui-react'
import SubmissionParticipantsForm from './SubmissionParticipantsForm'
import SubmissionImagesForm from './SubmissionImagesForm';
import {push} from "connected-react-router";

const statusOptions = [
    {
        text: 'SEND_TO_REWORK',
        value: 'SEND_TO_REWORK'
    },
    {
        text: 'DECLINED',
        value: 'DECLINED'
    },
    {
        text: 'BLOCKED',
        value: 'BLOCKED'
    },
    {
        text: 'ACCEPTED',
        value: 'ACCEPTED'
    }
];

class SubmissionDetailsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submission: null
        };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }


    componentDidMount() {
        this.props.getSubmissionByUUid(this.props.uuid, this.props.userId).then(() => {
            this.setState({submission: this.props.submission.data})
        });
    }

    updateStatus = () => {
        const allParticipants = this.commitParticipnats.commit();
        this.setState({submission: {...this.state.submission, allParticipants}});
        this.props.updateSubmission(this.state.submission).then(() => {
            this.props.goToSubmission();
        })
    };

    decline = () => {
        this.setState({submission: {...this.state.submission, status: "DECLINED"}});
        this.props.updateSubmission(this.state.submission).then(() => {
            this.props.goToSubmission();
        })
    };

    publish = () => {
        this.setState({submission: {...this.state.submission, status: "ACCEPTED"}});
        this.props.updateSubmission(this.state.submission).then(() => {
            this.props.publishSubmission(this.state.submission.id).then(() => {
                console.log(this.props);
            })
        })
    };


    updateNonNestedField = (e) => {

        this.setState({submission: {...this.state.submission, [e.target.name]: e.target.value}});

    };

    handleStatusChange(event, data) {
        const {value} = data;
        this.setState({submission: {...this.state.submission, status: value}});
    }

    renderForm = () => (
        <Form>
            <Form.Field>
                <label>City</label>
                <input onChange={e => this.updateNonNestedField(e)} placeholder='City' name={"city"}
                       value={this.state.submission.city}/>
            </Form.Field>
            <Form.Field>
                <label>Country</label>
                <input onChange={e => this.updateNonNestedField(e)} placeholder='Country' name={"country"}
                       value={this.state.submission.country}/>
            </Form.Field>
            <Form.Field>
                <label>equipment</label>
                <input onChange={e => this.updateNonNestedField(e)} placeholder='equipment' name={"equipment"}
                       value={this.state.submission.equipment}/>
            </Form.Field>
            <Form.Field control={TextArea} onChange={e => this.updateNonNestedField(e)} label='text' name="text"
                        value={this.state.submission.text}/>
            <Form.Field>
                <label>comment</label>
                <input onChange={e => this.updateNonNestedField(e)} placeholder='comment' name={"comment"}
                       value={this.state.submission.comment}/>
            </Form.Field>
            <Form.Field onChange={this.handleStatusChange} control={Dropdown} luid selection options={statusOptions}/>
        </Form>
    );


    render() {
        return (<div style={style.wrapper}>
            {this.state.submission && <div>
                <StaticContent sbmt={this.state.submission}/>
                <SubmissionParticipantsForm allParticipants={this.state.submission.allParticipants}
                                            onRef={ref => (this.commitParticipnats = ref)}/>
                {this.renderForm()}

                <SubmissionImagesForm userId={this.props.userId} uuid={this.props.uuid}/>

                <div>
                    <Button onClick={this.decline.bind(this)} secondary>Decline</Button>
                    <Button onClick={this.updateStatus.bind(this)} secondary>Update Status</Button>
                    <Button onClick={this.publish.bind(this)} primary>Publish</Button>
                </div>
            </div>}
        </div>)
    }

}

const style = {
    wrapper: {
        width: "100%"
    }
}


const StaticContent = ({sbmt}) => {
    const date = new Date(sbmt.createdOn);
    const readableDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
    return <List>
        <List.Item>ID: {sbmt.id}</List.Item>
        <List.Item>UUID: {sbmt.uuid}</List.Item>
        <List.Item>STATUS: {sbmt.status}</List.Item>
        <List.Item>Created On: {readableDate} ({sbmt.createdOn})</List.Item>
        <List.Item>Event Date: {sbmt.eventDate}</List.Item>
    </List>
}


const mapStateToProps = ({submission, publication}) => (
    {submission: submission, publication: publication}
);


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getSubmissionByUUid,
            updateSubmission,
            publishSubmission,
            goToSubmission: () => push(`/submission/`)
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmissionDetailsForm)
