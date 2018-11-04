import axios from "axios/index";
import {INIT_SUBMISSION, GET_SUBMISSION_BY_UUID, UPDATE_SUBMISSION} from "../../constants/submission/supmission-rest-clinet";
import {INIT_SUBMISSION_FULFILLED, INIT_SUBMISSION_REJECTED} from "../../constants/submission/supmissionConstants";
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

export const getSubmissionByUUid = (uuid) => (dispatch, getState) => {
    console.log(GET_SUBMISSION_BY_UUID + uuid + "/" + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN));
    return axios.get(GET_SUBMISSION_BY_UUID + uuid + "/" + getCookieByKey(USER).id + "/" + getCookieByKey(TOKEN)).then((res) => {
        dispatch({type: INIT_SUBMISSION_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: INIT_SUBMISSION_REJECTED, payload: err})
    })
};
