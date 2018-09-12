import React from 'react'
import {connect} from 'react-redux'
import styleSidebar from '../sidebar-style.scss'
import Dropzone from 'react-dropzone';
import {uploadWithStorageService, saveProfilePicToUser} from "../../../../../actions/uploadActions"
import {getCookieByKey, uploadNewProfilePic, USER, TOKEN} from "../../../../../services/CookieService";
import {PROFILE_IMGAGE_ERRORS} from '../../../../../messages/profile-image-errors';
import {UPDATE_PROFILE_PIC} from "../../../../../messages/profile";

const ALLOWED_FILE_FROMATS = ["png", "jpg", "jpeg"];
const MIN_HEIGHT = 400;
const MIN_WIDTH = 400;
const MAX_BYTES = 5242880;
export const FRIENDLY_HOST = "https://f002.backblazeb2.com/file/yf-profiles/";
const NATIVE_HOST = "https://f002.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=";

class ProfilePicUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            error: '',
            dragStyle: style.dropzone,
            loadCounter: 0
        };
    }

    componentDidMount() {
    }

    onImageDrop = async (files) => {
        this.setState({error: ''});
        let file = files[0];
        try {
            const fileContents = await this.isDimentionsValid(file).catch(err => {
                this.setState({error: err});
                throw err;
            });
            let fileName = file.name.split('.').pop();
            if (!ALLOWED_FILE_FROMATS.includes(fileName)) {
                this.setState({error: PROFILE_IMGAGE_ERRORS.WRONG_FORMAT});
            } else if (files.size > MAX_BYTES) {
                this.setState({error: PROFILE_IMGAGE_ERRORS.FILE_TOO_LARGE});
            } else {
                this.handleImageUpload(file);
            }
        } catch (e) {
            console.log(e);
        }
    };

    isDimentionsValid = inputFile => {
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            temporaryFileReader.onload = () => {
                console.log(temporaryFileReader);


                let image = new Image();
                image.src = temporaryFileReader.result;
                image.onload = function () {

                    console.log(image);

                    if (image.width < MIN_WIDTH || image.height < MIN_HEIGHT) {
                        reject(PROFILE_IMGAGE_ERRORS.WRONG_RESOLUTION)
                    } else {
                        resolve(image);
                    }
                };
            };
            temporaryFileReader.readAsDataURL(inputFile);
        });
    };

    handleImageUpload(file) {

        const config = {
            onUploadProgress: progressEvent => {
                this.setState({loadCounter: Math.round((progressEvent.loaded * 100) / progressEvent.total)})
            },
            timeout: 500000
        };


        this.setState({fetching: true});
        const fd = new FormData();
        fd.append('file', file);
        let user = getCookieByKey(USER);
        fd.append('userId', user.id);
        fd.append('orientation', window.orientation);
        this.props.dispatch(uploadWithStorageService(fd, config)).then(() => {
            this.props.changeProfilePic(this.props.data.fileName);

            let profilePicDto = {
                fileId: this.props.data.fileId,
                fileName: this.props.data.fileName,
                friendlyLink: FRIENDLY_HOST + this.props.data.fileName,
                nativeLink: NATIVE_HOST + this.props.data.fileId
            };


            this.props.dispatch(saveProfilePicToUser(user.id, getCookieByKey(TOKEN), profilePicDto));
            this.setState({fetching: false});
            return profilePicDto;
        }).then(dto => uploadNewProfilePic(dto))
    }

    changeDropZoneStyle = (isEnter) => {
        const dropStyle = isEnter ? style.dropEnter : style.dropzone;
        this.setState({dragStyle: dropStyle});
    }

    render() {
        return (
            <div>
                <style jsx>{styleSidebar}</style>
                {this.state && <div className={"update"}>
                    <Dropzone onDragEnter={this.changeDropZoneStyle.bind(this, true)}
                              onDragLeave={this.changeDropZoneStyle.bind(this, false)}
                              style={this.state.dragStyle}
                              multiple={false}
                              accept="image/*"
                              onDrop={this.onImageDrop.bind(this)}>
                        <img className={this.state.fetching && 'spinning'}
                             src={"/static/img/icons/refresh-light-grey.png"}/>
                        {this.state.fetching && <span>{this.state.loadCounter}%</span>}
                        <span>{UPDATE_PROFILE_PIC}</span>
                        {this.state.error && <div>
                            <span>{this.state.error.transaction}</span>
                        </div>}
                    </Dropzone>
                </div>}


            </div>
        )
    }
}

function mapStateToProps(state) {
    const {upload} = state;
    return upload;
}

export default connect(mapStateToProps)(ProfilePicUploader)

const style = {
    dropzone: {
        position: 'relative',
        borderWidth: '2px',
        borderColor: 'rgb(102, 102, 102)',
        borderStyle: 'dashed',
        borderRadius: '5px',
        height: '300px',
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
