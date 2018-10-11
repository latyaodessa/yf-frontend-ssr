import axios from "axios/index";
import {UPLOAD_FILE__REJECTED, UPLOAD_FILE_FULFILLED, FILE_SAVED, FILE_REJECTED} from '../constants/files/uploadConstants'
import {SAVE_UPLOADED_PIC, UPLOAD_PROFILE_PIC, UPLOAD_PICS_FOR_SUBMISSION} from '../constants/rest/StorageRestClient'

export const uploadWithStorageService = (file, config) => (dispatch, getState) => {
    return axios.post(UPLOAD_PROFILE_PIC, file, config).then((res) => {
        dispatch({type: UPLOAD_FILE_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: UPLOAD_FILE__REJECTED, payload: err})
    })
};

export const uploadPicsForSumbissionWithStorageService = (file, config) => (dispatch, getState) => {
    return axios.post(UPLOAD_PICS_FOR_SUBMISSION, file, config).then((res) => {
        dispatch({type: UPLOAD_FILE_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: UPLOAD_FILE__REJECTED, payload: err})
    })
};

export const deletePicForSumbissionWithStorageService = (obj) => (dispatch, getState) => {
    return axios.delete(UPLOAD_PICS_FOR_SUBMISSION, {params: obj}).then((res) => {
        dispatch({type: UPLOAD_FILE_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: UPLOAD_FILE__REJECTED, payload: err})
    })
};

export const saveProfilePicToUser = (userId, token, profilePicDto) => (dispatch, getState) => {
    return axios.put([SAVE_UPLOADED_PIC, userId, token].join("/"), profilePicDto, {
        timeout: 500000
    }).then((res) => {
         dispatch({type: FILE_SAVED, payload: res.data});
    }).catch((err) => {
        dispatch({type: FILE_REJECTED, payload: err})
    })
};

