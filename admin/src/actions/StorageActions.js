import axios from "axios/index";
import {
    FILE_REJECTED,
    FILE_SAVED,
    GET_SUB_LIST_FULFILLED,
    GET_SUB_LIST_REJECTED,
    UPLOAD_FILE__REJECTED,
    UPLOAD_FILE_FULFILLED
} from '../constants/storage/uploadConstants'
import {
    GET_USER_SUBMISSION_PICS,
    SAVE_UPLOADED_PIC,
    SUBMISSION_PIC,
    UPLOAD_PICS_FOR_SUBMISSION,
    UPLOAD_PROFILE_PIC
} from '../constants/storage/StorageRestClient'


export const getPicsSubmission = (uuid, userId) => (dispatch, getState) => {
    return axios.get(GET_USER_SUBMISSION_PICS + userId + "/" + uuid).then((res) => {
        dispatch({type: GET_SUB_LIST_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: GET_SUB_LIST_REJECTED, payload: err})
    })
};

export const getSubmissionImgPic = (uuid, userId, imgName) => {
    return `${SUBMISSION_PIC}/${userId}/${uuid}/${imgName}`;
};

