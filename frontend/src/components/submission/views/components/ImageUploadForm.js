import React from 'react'
import {connect} from "react-redux";
import Dropzone from 'react-dropzone';
import styles from './../styles.scss'
import {cloneDeep} from 'lodash';

import {PROFILE_IMGAGE_ERRORS} from "../../../../messages/profile-image-errors";

import {Form, Grid, Label, Progress, Segment} from 'semantic-ui-react'
import {
    ERROR_REQUIRED_FIELD,
    MAX_FILES_LABEL,
    MAX_SIZE_LABEL,
    MIN_DIMENTIONS_LABEL,
    UPLOAD_FORMATS_LABEL,
    UPLOAD_PICS_LABEL
} from "../../../../messages/submission";
import {
    deletePicForSumbissionWithStorageService,
    getPicsSubmission,
    getSubmissionImgPic,
    uploadPicsForSumbissionWithStorageService
} from "../../../../actions/uploadActions";
import moment from "moment/moment";
import _ from "lodash";

const ALLOWED_FILE_FROMATS = ["png", "jpg", "jpeg"];
const MAX_BYTES = 10485760;
const MIN_HEIGHT = 1280;
const MIN_WIDTH = 1280;
const MAX_FILES = 15;

const UploadInfo = () => {
    return <div>
        <style jsx>{styles}</style>
        <div className={"upload-pics-container"}>
            <img src={"/static/img/icons/cloud-upload.png"}/>
            <div>
                <h2>{UPLOAD_PICS_LABEL}</h2>
                <span>{UPLOAD_FORMATS_LABEL}</span>
                <div>
                    <span>{MAX_FILES_LABEL}</span>
                </div>
            </div>
        </div>
    </div>
};

class ImageUploadForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageFiles: [],
            dragStyle: style.dropzone,
            error: '',
            uuid: props.initUuid
        }
    }

    componentDidMount() {
        this.props.dispatch(getPicsSubmission(this.state.uuid)).then(() => {
            this.setState({
                imageFiles: this.props.submissionPicsList.data
            })
        })
    }

    onDrop = async (imageFiles) => {

        try {
            this.setState({error: ''});


            await imageFiles.map(async (img, index) => {

                let fileName = img.name.split('.').pop();

                await this.validateFile(img).catch(err => {
                    throw err;
                });

                let uniqueId = Math.random().toString(36).substring(2)
                    + (new Date()).getTime().toString(36);

                let blob = img.slice(0, img.size, img.type);
                let newFile = new File([blob], `${uniqueId}.${fileName}`, {type: img.type});
                newFile.preview = img.preview;

                await this.setState({imageFiles: [...this.state.imageFiles, newFile]});

                await this.handleImageUpload(newFile, index);


            });
        } catch (e) {
            this.setState({error: e});
        }

    };


    validateFile = async (img) => {
        try {
            let fileName = img.name.split('.').pop();

            if (this.state.imageFiles.length > MAX_FILES) {
                throw MAX_FILES_LABEL;
            }
            if (!ALLOWED_FILE_FROMATS.includes(fileName)) {
                throw PROFILE_IMGAGE_ERRORS.WRONG_FORMAT.transaction;
            }
            if (img.size > MAX_BYTES) {
                throw MAX_SIZE_LABEL;
            }

            await this.isDimentionsValid(img).catch(err => {
                throw err;
            });
        } catch (e) {
            this.setState({error: e});
            throw e;
        }

    };

    handleImageUpload = async (file, index) => {

        const config = {
            onUploadProgress: progressEvent => {
                const imageFiles = cloneDeep(this.state.imageFiles);
                const counter = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                imageFiles[index].loadCounter = counter;
                this.setState({imageFiles});
            },
            timeout: 500000
        };


        // this.setState({fetching: true});
        const fd = new FormData();
        fd.append('file', file);
        // let user = getCookieByKey(USER);
        // fd.append('userId', user.id);
        fd.append('orientation', window.orientation);
        await this.props.dispatch(uploadPicsForSumbissionWithStorageService(this.state.uuid, fd, config)).then(() => {

            // this.props.changeProfilePic(this.props.data.fileName);
            //
            // let profilePicDto = {
            //     fileId: this.props.data.fileId,
            //     fileName: this.props.data.fileName,
            //     friendlyLink: FRIENDLY_HOST + this.props.data.fileName,
            //     nativeLink: NATIVE_HOST + this.props.data.fileId
            // };


            // this.props.dispatch(saveProfilePicToUser(user.id, getCookieByKey(TOKEN), profilePicDto));
            // this.setState({fetching: false});
            // return profilePicDto;
        })
        // .then(dto => uploadNewProfilePic(dto))
    };

    isDimentionsValid = inputFile => {
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            temporaryFileReader.onload = () => {


                let image = new Image();
                image.src = temporaryFileReader.result;
                image.onload = function () {


                    if (image.width < MIN_WIDTH || image.height < MIN_HEIGHT) {
                        reject(MIN_DIMENTIONS_LABEL)
                    } else {
                        resolve(image);
                    }
                };
            };
            temporaryFileReader.readAsDataURL(inputFile);
        });
    };

    changeDropZoneStyle = (isEnter) => {
        const dropStyle = isEnter ? style.dropEnter : style.dropzone;
        this.setState({dragStyle: dropStyle});
    };

    preventDragHandler = (e) => {
        e.preventDefault();
    };

    deleteImg = (file, index) => {
        const obj = {
            fileName: file.name
        };

        this.props.dispatch(deletePicForSumbissionWithStorageService(this.state.uuid, obj)).then(() => {
            let imageFiles = this.state.imageFiles;
            imageFiles.splice(index, 1);
            this.setState({
                imageFiles
            })
        })
    };


    commit = async () => {
        this.setState({error: ''});
        if(this.state.imageFiles.length < 5) {
            this.setState({error: MAX_FILES_LABEL});
            throw MAX_FILES_LABEL;
        }
    };

    renderImages = () => {
        return this.state.imageFiles.length > 0 && <div className={"pics-container"}>
            <style jsx>{styles}</style>
            <Grid stackable columns={3}>

                {this.state.imageFiles.map((file, index) => <Grid.Column
                    key={file.name + file.lastModified}>
                    <div className={"img-container"}>
                        <Segment style={{padding: 0}} basic>
                            {file.loadCounter &&
                            <Progress percent={file.loadCounter} attached='top'
                                      color={file.loadCounter !== 100 ? 'purple' : 'green'}/>}
                            <div>
                                <div className="tools-wrapper">
                                    {/*<style jsx>{dashboardStyles}</style>*/}
                                    <div className="delete-container">
                                        <img
                                            onClick={this.deleteImg.bind(this, file, index)}
                                            className="delete-button-img"
                                            src={"/static/img/icons/close-button.png"}/>
                                    </div>
                                </div>
                                <img onDragStart={this.preventDragHandler}
                                     src={file.uploaded ? getSubmissionImgPic(this.state.uuid, file.name) : file.preview}/>
                            </div>
                        </Segment>
                    </div>
                </Grid.Column>)
                }

            </Grid>
        </div>
    };

    getErrorText = () => {
        return <Grid.Column>
            <Segment textAlign='center' basic>
                <Form.Field>
                    <Label style={{background: "#de6262", color: "#FFF"}} pointing='below'>
                        {this.state.error}
                    </Label>
                </Form.Field>
            </Segment>
        </Grid.Column>
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <style jsx>{styles}</style>
                <Grid stackable columns={1}>
                    <Grid.Column>
                        {this.renderImages()}
                    </Grid.Column>
                    {this.state.error && this.getErrorText()}
                    <Grid.Column>
                        <Segment textAlign='left' basic>
                            {/*<Label attached='top'>{GENERAL_PHSHOOTING_INFO_LABEL}</Label>*/}
                            <div className="dropzone">
                                <Dropzone
                                    // onDragEnter={this.changeDropZoneStyle.bind(this, true)}
                                    // onDragLeave={this.changeDropZoneStyle.bind(this, false)}
                                    style={style.dropzone}
                                    onDrop={this.onDrop.bind(this)}>

                                    <UploadInfo/>
                                </Dropzone>
                            </div>
                            <aside>
                                {/*<h2>Dropped files</h2>*/}
                                {/*<ul>*/}
                                {/*{*/}
                                {/*this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)*/}
                                {/*}*/}
                                {/*</ul>*/}


                            </aside>
                        </Segment>
                    </Grid.Column>
                </Grid>

            </div>
        )
    }
}

const style = {
    dropzone: {
        position: 'relative',
        borderWidth: '2px',
        borderColor: 'rgb(102, 102, 102)',
        borderStyle: 'dashed',
        borderRadius: '5px',
        margin: '10px'
    },
    dropEnter: {
        position: 'relative',
        borderWidth: '2px',
        borderColor: 'rgb(255, 255, 255)',
        borderStyle: 'dashed',
        borderRadius: '5px',
        height: '300px',
        margin: '10px',
        background: '#797979'
    }
};


function mapStateToProps(state) {
    // const {submissionUuid} = state;
    // return {submissionUuid: submissionUuid, submissionPicsList: submissionPicsList};
    return state;
}

export default connect(mapStateToProps)(ImageUploadForm);

