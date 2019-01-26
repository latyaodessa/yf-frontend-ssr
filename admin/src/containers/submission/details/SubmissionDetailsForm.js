import React from 'react'
import {connect} from 'react-redux'
import {
    getSubmissionByUUid,
    publishSubmission,
    updatePublicationPictures,
    updateSubmission
} from "../../../actions/SubmissionActions";
import {uploadImagesToCloud} from "../../../actions/StorageActions";
import {bindActionCreators} from "redux";
import {Button, Dropdown, Form, List, Segment, TextArea} from 'semantic-ui-react'
import SubmissionParticipantsForm from './SubmissionParticipantsForm'
import SubmissionImagesForm from './SubmissionImagesForm';
import {push} from "connected-react-router";
import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid";

const BACKPLAZE_HOST = "https://f002.backblazeb2.com/file/youngfolks/";

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
            submission: null,
            publicationId: null,
            thumbnailName: null
        };
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.updateThumbnail = this.updateThumbnail.bind(this)
    }


    componentDidMount() {
        this.props.getSubmissionByUUid(this.props.uuid, this.props.userId).then(() => {
            this.setState({submission: this.props.submission.data})
        });
    }

    updateThumbnail = (thumbnailName) => {
        this.setState({thumbnailName: thumbnailName});
    };

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


            if (this.state.publicationId) {
                this.updateImages();
            } else {
                this.props.publishSubmission(this.state.submission.id).then(() => {
                    console.log(this.props);
                    this.setState({
                        publicationId: this.props.publication.data.id
                    });
                    this.updateImages();
                })
            }


        })
    };

    updateImages = () => {
        this.props.uploadImagesToCloud(this.props.userId, this.props.uuid, this.props.publication.data.id, this.props.publication.data.link).then(async () => {
            console.log(this.props);
            if (this.props.uploadToCloud.data && !this.props.uploadToCloud.data.includes(null)) {
                let images = [];
                let thumbnailId = "";
                await this.props.uploadToCloud.data.map(upload => {
                    images.push({
                        fileId: upload.fileId,
                        fileName: upload.fileName,
                        contentSha1: upload.contentSha1,
                        friendlyLink: BACKPLAZE_HOST + upload.fileName
                    });
                    if(this.state.thumbnailName && upload.originalName.includes(this.state.thumbnailName)) {
                        thumbnailId =  upload.fileId;
                    }
                });
                console.log(thumbnailId);

                this.props.updatePublicationPictures(this.props.publication.data.id, images, thumbnailId);
                this.props.goToSubmission();
            } else {
                console.error("PROBLEMS WITH UPLOAD");
            }
        });

    }


    updateNonNestedField = (e) => {

        this.setState({submission: {...this.state.submission, [e.target.name]: e.target.value}});

    };

    handleStatusChange(event, data) {
        const {value} = data;
        this.setState({submission: {...this.state.submission, status: value}});
    }

    renderForm = () => (
        <Segment>
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
                <Form.Field>
                    <label>title</label>
                    <input onChange={e => this.updateNonNestedField(e)} placeholder='title' name={"title"}
                           value={this.state.submission.title}/>
                </Form.Field>
                <Form.Field control={TextArea} onChange={e => this.updateNonNestedField(e)} label='about' name="about"
                            value={this.state.submission.about}/>
                <Form.Field>
                    <label>comment</label>
                    <input onChange={e => this.updateNonNestedField(e)} placeholder='comment' name={"comment"}
                           value={this.state.submission.comment}/>
                </Form.Field>
                <Form.Field onChange={this.handleStatusChange} control={Dropdown} luid selection
                            options={statusOptions}/>
            </Form>
        </Segment>
    );


    render() {
        return (<div style={style.wrapper}>
            {this.state.submission && <div>
                <StaticContent sbmt={this.state.submission}/>
                <SubmissionParticipantsForm allParticipants={this.state.submission.allParticipants}
                                            onRef={ref => (this.commitParticipnats = ref)}/>
                {this.renderForm()}

                <SubmissionImagesForm userId={this.props.userId} uuid={this.props.uuid} updateThumbnail={this.updateThumbnail}/>

                <div>
                    <Button onClick={this.decline.bind(this)} secondary>Decline</Button>
                    <Button onClick={this.updateStatus.bind(this)} secondary>Update State</Button>
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
};


const StaticContent = ({sbmt}) => {
    const date = new Date(sbmt.createdOn);
    const eventDate = new Date(sbmt.eventDate * 1000);
    const readableDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
    return <List>
        <List.Item>ID: {sbmt.id}</List.Item>
        <List.Item>UUID: {sbmt.uuid}</List.Item>
        <List.Item>STATUS: {sbmt.status}</List.Item>
        <List.Item>Created On: {readableDate} ({sbmt.createdOn})</List.Item>
        <List.Item>Event Date: {`${('0' + eventDate.getDate()).slice(-2)}-${("0" + (eventDate.getMonth() + 1)).slice(-2)}-${eventDate.getFullYear()}`}</List.Item>
    </List>
}


const mapStateToProps = ({submission, publication, uploadToCloud}) => (
    {submission: submission, publication: publication, uploadToCloud: uploadToCloud}
);


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getSubmissionByUUid,
            updateSubmission,
            publishSubmission,
            uploadImagesToCloud,
            updatePublicationPictures,
            goToSubmission: () => push(`/submission/`)
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmissionDetailsForm)
