import axios from "axios/index";
import {UPLOAD_FILE__REJECTED, UPLOAD_FILE_FULFILLED, FILE_SAVED, FILE_REJECTED} from '../constants/files/uploadConstants'
import {SAVE_UPLOADED_PIC, UPLOAD_PROFILE_PIC} from '../constants/rest/StorageRestClient'

export const uploadWithStorageService = (file) => (dispatch, getState) => {
    return axios.post(UPLOAD_PROFILE_PIC, file, {
        timeout: 500000
    }).then((res) => {
        console.log(res);
        dispatch({type: UPLOAD_FILE_FULFILLED, payload: res.data});
    }).catch((err) => {

        console.log(err);

        dispatch({type: UPLOAD_FILE__REJECTED, payload: err})
    })
};


export const saveProfilePicToUser = (userId, token, profilePicDto) => (dispatch, getState) => {
    return axios.put([SAVE_UPLOADED_PIC, userId, token].join("/"), profilePicDto, {
        timeout: 500000
    }).then((res) => {
        console.log(res);
         dispatch({type: FILE_SAVED, payload: res.data});
    }).catch((err) => {

        console.log(err);

        dispatch({type: FILE_REJECTED, payload: err})
    })
};
