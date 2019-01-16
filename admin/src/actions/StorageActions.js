import axios from "axios/index";
import {GET_SUB_LIST_FULFILLED, GET_SUB_LIST_REJECTED, UPLOAD_IMAGES_TO_CLOUD_FULFILLED, UPLOAD_IMAGES_TO_CLOUD_REJECTED} from '../constants/storage/uploadConstants'
import {GET_USER_SUBMISSION_PICS, SUBMISSION_PIC, UPLOAD_IMAGES_TO_CLOUD} from '../constants/storage/StorageRestClient'


export const getPicsSubmission = (uuid, userId) => (dispatch, getState) => {
    return axios.get(GET_USER_SUBMISSION_PICS + userId + "/" + uuid).then((res) => {
        dispatch({type: GET_SUB_LIST_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: GET_SUB_LIST_REJECTED, payload: err})
    })
};

export const uploadImagesToCloud = (userId, submissionUUID, publicationId, link) => (dispatch, getState) => {

    const obj = {
        userId: userId,
        submissionUUID: submissionUUID,
        publicationId: publicationId,
        link: link
    };

    return axios.post(UPLOAD_IMAGES_TO_CLOUD, obj).then((res) => {
        dispatch({type: UPLOAD_IMAGES_TO_CLOUD_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: UPLOAD_IMAGES_TO_CLOUD_REJECTED, payload: err})
    })
};

export const getSubmissionImgPic = (uuid, userId, imgName) => {
    return `${SUBMISSION_PIC}/${userId}/${uuid}/${imgName}`;
};

