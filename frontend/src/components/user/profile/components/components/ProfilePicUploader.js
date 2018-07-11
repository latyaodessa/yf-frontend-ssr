import React from 'react'
import {connect} from 'react-redux'
import styleSidebar from '../sidebar-style.scss'
import Dropzone from 'react-dropzone';
import {uploadProfilePic, uploadPic} from "../../../../../actions/uploadActions"

class ProfilePicUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadedFileUrl: ''
        };
    }

    componentDidMount() {
    }

    onImageDrop = (files) => {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    };

    handleImageUpload(file) {
        this.props.dispatch(uploadProfilePic(file)).then(()=> {
           console.log(this.props);
       })
        // upload.end((err, response) => {
        //     if (err) {
        //         console.error(err);
        //     }
        //
        //     if (response.body.secure_url !== '') {
        //         this.setState({
        //             uploadedFileCloudinaryUrl: response.body.secure_url
        //         });
        //     }
        // });
    }


    render() {
        return (
            <div>
                <style jsx>{styleSidebar}</style>


                <div className={"update"}>
                    <Dropzone
                              multiple={false}
                              accept="image/*"
                              onDrop={this.onImageDrop.bind(this)}>
                        <img src={"/static/img/icons/looping-arrows.png"}/>
                        <span>Обновить фотографию</span>
                    </Dropzone>
                </div>


            </div>
        )
    }
}

function mapStateToProps(state) {
    const {upload} = state;
    return upload;
}


export default connect(mapStateToProps)(ProfilePicUploader)
