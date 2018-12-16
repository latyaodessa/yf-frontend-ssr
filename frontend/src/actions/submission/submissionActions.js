import axios from "axios/index";
import {
    GET_SUBMISSION_BY_UUID,
    GET_SUBMISSIONS_BY_USER_ID,
    INIT_SUBMISSION,
    SUBMIT_SUBMISSION,
    UPDATE_SUBMISSION
} from "../../constants/submission/supmission-rest-clinet";
import {INIT_SUBMISSION_FULFILLED, INIT_SUBMISSION_REJECTED, SUBMISSIONS_LIST_FULFILLED, SUBMISSIONS_LIST_REJECTED} from "../../constants/submission/supmissionConstants";
import {getCookieByKey, TOKEN, USER} from "../../services/CookieService";

export const initSubmission = (participants) => (dispatch, getState) => {
    return axios.post(INIT_SUBMISSION + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN), participants).then((res) => {
        dispatch({type: INIT_SUBMISSION_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: INIT_SUBMISSION_REJECTED, payload: err})
    })
};

export const updateSubmission = (submission) => (dispatch, getState) => {
    return axios.post(UPDATE_SUBMISSION + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN), submission).then((res) => {
        dispatch({type: INIT_SUBMISSION_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: INIT_SUBMISSION_REJECTED, payload: err})
    })
};

export const submit = (submission) => (dispatch, getState) => {
    return axios.post(SUBMIT_SUBMISSION + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN), submission).then((res) => {
        dispatch({type: INIT_SUBMISSION_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: INIT_SUBMISSION_REJECTED, payload: err})
    })
};

export const getSubmissionByUUid = (uuid) => (dispatch, getState) => {
    return axios.get(GET_SUBMISSION_BY_UUID + uuid + "/" + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN)).then((res) => {
        dispatch({type: INIT_SUBMISSION_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: INIT_SUBMISSION_REJECTED, payload: err})
    })
};

export const getAllUserSubmissions = (offset, limit) => (dispatch, getState) => {
    return axios.get(GET_SUBMISSIONS_BY_USER_ID + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN) + "/" + offset + "/" + limit).then((res) => {
        dispatch({type: SUBMISSIONS_LIST_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: SUBMISSIONS_LIST_REJECTED, payload: err})
    })
};
