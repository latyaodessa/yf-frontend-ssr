import React from 'react'
import {connect} from "react-redux";
import Dropzone from 'react-dropzone';
import styles from './../styles.scss'
import {cloneDeep} from 'lodash';

import {Grid, Progress, Segment,} from 'semantic-ui-react'
import {UPLOAD_FORMATS_LABEL, UPLOAD_PICS_LABEL} from "../../../../messages/submission";
import {
    uploadPicsForSumbissionWithStorageService,
    deletePicForSumbissionWithStorageService
} from "../../../../actions/uploadActions";

const ALLOWED_FILE_FROMATS = ["png", "jpg", "jpeg"];
// const MAX_BYTES = 1,5e+7;
const MIN_HEIGHT = 400;
const MIN_WIDTH = 400;

const UploadInfo = () => {
    return <div>
        <style jsx>{styles}</style>
        <div className={"upload-pics-container"}>
            <img src={"/static/img/icons/cloud-upload.png"}/>
            <div>
                <h2>{UPLOAD_PICS_LABEL}</h2>
                <span>{UPLOAD_FORMATS_LABEL}</span>
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
            error: ''
        }
    }

    onDrop = async (imageFiles) => {

        this.setState({
            imageFiles
        });

        imageFiles.map(async (img, index) => {
            try {
                // await this.isDimentionsValid(img).catch(err => {
                //     this.setState({error: err});
                //     throw err;
                // });
                // let fileName = img.name.split('.').pop();
                // if (!ALLOWED_FILE_FROMATS.includes(fileName)) {
                //     this.setState({error: PROFILE_IMGAGE_ERRORS.WRONG_FORMAT});
                //     // } else if (img.size > MAX_BYTES) {
                //     //     this.setState({error: PROFILE_IMGAGE_ERRORS.FILE_TOO_LARGE});
                // } else {
                await this.handleImageUpload(img, index);
                // }
            } catch (e) {
                console.log(e);
            }

        });

    };

    handleImageUpload = async (file, index) => {
        console.log(index);

        const config = {
            onUploadProgress: progressEvent => {
                console.log("ping");
                const imageFiles = cloneDeep(this.state.imageFiles);
                const counter = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                imageFiles[index].loadCounter = counter;
                // console.log(counter);
                // console.log("AAA");
                console.log(imageFiles);
                // this.setState({counter: counter}); //TEST
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
        await this.props.dispatch(uploadPicsForSumbissionWithStorageService(fd, config)).then(() => {
            console.log("uploaded");

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

    // isDimentionsValid = inputFile => {
    //     const temporaryFileReader = new FileReader();
    //
    //     return new Promise((resolve, reject) => {
    //         temporaryFileReader.onerror = () => {
    //             temporaryFileReader.abort();
    //             reject(new DOMException("Problem parsing input file."));
    //         };
    //
    //         temporaryFileReader.onload = () => {
    //             console.log(temporaryFileReader);
    //
    //
    //             let image = new Image();
    //             image.src = temporaryFileReader.result;
    //             image.onload = function () {
    //
    //                 console.log(image);
    //
    //                 if (image.width < MIN_WIDTH || image.height < MIN_HEIGHT) {
    //                     reject(PROFILE_IMGAGE_ERRORS.WRONG_RESOLUTION)
    //                 } else {
    //                     resolve(image);
    //                 }
    //             };
    //         };
    //         temporaryFileReader.readAsDataURL(inputFile);
    //     });
    // };

    changeDropZoneStyle = (isEnter) => {
        const dropStyle = isEnter ? style.dropEnter : style.dropzone;
        this.setState({dragStyle: dropStyle});
    };

    preventDragHandler = (e) => {
        e.preventDefault();
    };

    deleteImg = (file, index) => {
        console.log(file.name)
        const obj = {
            fileName: file.name
        };

        this.props.dispatch(deletePicForSumbissionWithStorageService(obj)).then(() => {
            let imageFiles = this.state.imageFiles;
            imageFiles.splice(index, 1);
            this.setState({
                imageFiles
            })
        })
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
                                     src={file.preview}/>
                            </div>
                        </Segment>
                    </div>
                </Grid.Column>)
                }

            </Grid>
        </div>
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
    return state;
}

export default connect(mapStateToProps)(ImageUploadForm);

