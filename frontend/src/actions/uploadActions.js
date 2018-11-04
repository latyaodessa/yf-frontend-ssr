import axios from "axios/index";
import {
    FILE_REJECTED,
    FILE_SAVED,
    GET_SUB_LIST_FULFILLED,
    GET_SUB_LIST_REJECTED,
    UPLOAD_FILE__REJECTED,
    UPLOAD_FILE_FULFILLED
} from '../constants/files/uploadConstants'
import {
    GET_USER_SUBMISSION_PICS,
    SAVE_UPLOADED_PIC,
    UPLOAD_PICS_FOR_SUBMISSION,
    UPLOAD_PROFILE_PIC,
    SUBMISSION_PIC
} from '../constants/rest/StorageRestClient'
import {getCookieByKey, USER} from "../services/CookieService";

export const uploadWithStorageService = (file, config) => (dispatch, getState) => {
    return axios.post(UPLOAD_PROFILE_PIC, file, config).then((res) => {
        dispatch({type: UPLOAD_FILE_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: UPLOAD_FILE__REJECTED, payload: err})
    })
};

export const uploadPicsForSumbissionWithStorageService = (uuid, file, config) => (dispatch, getState) => {
    return axios.post(UPLOAD_PICS_FOR_SUBMISSION + getCookieByKey(USER).id + "/" + uuid, file, config).then((res) => {
        dispatch({type: UPLOAD_FILE_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: UPLOAD_FILE__REJECTED, payload: err})
    })
};

export const getPicsSubmission = (uuid) => (dispatch, getState) => {
    return axios.get(GET_USER_SUBMISSION_PICS + getCookieByKey(USER).id + "/" + uuid).then((res) => {
        dispatch({type: GET_SUB_LIST_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: GET_SUB_LIST_REJECTED, payload: err})
    })
};

export const deletePicForSumbissionWithStorageService = (uuid, obj) => (dispatch, getState) => {
    return axios.delete(UPLOAD_PICS_FOR_SUBMISSION + getCookieByKey(USER).id + "/" + uuid, {params: obj}).then((res) => {
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

export const getSubmissionImgPic = (uuid, imgName) => {
    return `${SUBMISSION_PIC}/${getCookieByKey(USER).id}/${uuid}/${imgName}`;
};

