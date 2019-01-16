import axios from "axios";
import {GET_SUBMISSION_LIST_FULFILLED, GET_SUBMISSION_LIST_REJECTED, FETCH_SUBMISSION_REJECTED, FETCH_SUBMISSION_FULFILLED, PUBLISH_SUBMISSION_FULFILLED, PUBLISH_SUBMISSION_REJECTED} from '../constants/submisson/SupmissionConstants';
import {GET_SUBMISSIONS_BY_STATUS, GET_SUBMISSION_BY_UUID, UPDATE_SUBMISSION, PUBLISH_SUBMISSION, PUBLICATION_IMAGES} from "../constants/submisson/supmission-rest-clinet";
import {getCookieByKey, TOKEN, USER} from "../containers/core/auth/CookieService";

export const getSubmissionList = (status) => (dispatch, getState) => {
    return axios.get(GET_SUBMISSIONS_BY_STATUS + status + "/" + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN)).then((res) => {
        dispatch({type: GET_SUBMISSION_LIST_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: GET_SUBMISSION_LIST_REJECTED, payload: err})
    })
};

export const getSubmissionByUUid = (uuid, userId) => (dispatch, getState) => {
    return axios.get(GET_SUBMISSION_BY_UUID + uuid + "/" + userId + "/" + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN)).then((res) => {
        dispatch({type: FETCH_SUBMISSION_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: FETCH_SUBMISSION_REJECTED, payload: err})
    })
};

export const updateSubmission = (submissionDto) => (dispatch, getState) => {
    return axios.put(UPDATE_SUBMISSION  + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN), submissionDto).then((res) => {
        dispatch({type: FETCH_SUBMISSION_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: FETCH_SUBMISSION_REJECTED, payload: err})
    })
};

export const publishSubmission = (submissionId) => (dispatch, getState) => {
    return axios.post(PUBLISH_SUBMISSION  + submissionId + "/" + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN), {}).then((res) => {
        dispatch({type: PUBLISH_SUBMISSION_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: PUBLISH_SUBMISSION_REJECTED, payload: err})
    })
};

export const updatePublicationPictures = (publicationId, pictures) => (dispatch, getState) => {
    return axios.put(PUBLICATION_IMAGES  + publicationId, pictures).then((res) => {
        dispatch({type: "OK", payload: res.data});
    }).catch((err) => {
        dispatch({type: "NOT_OK", payload: err})
    })
};
