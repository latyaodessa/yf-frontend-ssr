import axios from "axios/index";
import {UPLOAD_FILE, BUCKET_TYPES, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL} from '../constants/upload-rest-clinet'
import {UPLOAD_FILE__REJECTED, UPLOAD_FILE_FULFILLED} from '../constants/files/uploadConstants'


const getAxiosConfig = (authorizationToken, bucketId, file) => {
    return axios.create({
        timeout: 10000,
        headers: {
            'Authorization': authorizationToken,
            'X-Bz-File-Name': "test.jpg",
            'Content-Type' : 'text/plain',
            'X-Bz-Content-Sha1': file
        }
    });
};

export const uploadProfilePic = (file) => (dispatch, getState) => {
    console.log(file);
    return axios.get(UPLOAD_FILE + BUCKET_TYPES.PROFILES, {
        timeout: 10000
    })
        .then((res) => res.data)
        .then((res) => {
            console.log(res);
            getAxiosConfig(res.authorizationToken, res.bucketId, file).get(res.uploadUrl)
                .then((uploadResp) => {
                console.log(uploadResp);
            }).catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);

            dispatch({type: UPLOAD_FILE__REJECTED, payload: err})
        })
};

export const uploadPic = (file) => (dispatch, getState) => {
    console.log(file);
    return axios.post(CLOUDINARY_UPLOAD_URL, {}, {
        timeout: 10000,
        params: {
            'upload_preset': CLOUDINARY_UPLOAD_PRESET,
            'file': file
        }

    }).then((res) => {
        console.log(res);
        dispatch({type: UPLOAD_FILE_FULFILLED, payload: res.data});
    }).catch((err) => {

            console.log(err);

            dispatch({type: UPLOAD_FILE__REJECTED, payload: err})
        })
};
