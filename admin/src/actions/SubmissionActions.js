import axios from "axios";
import {GET_SUBMISSION_LIST_FULFILLED, GET_SUBMISSION_LIST_REJECTED} from '../constants/submisson/SupmissionConstants';
import {GET_SUBMISSIONS_BY_STATUS} from "../constants/submisson/supmission-rest-clinet";

export const getSubmissionList = (status) => (dispatch, getState) => {
    return axios.get(GET_SUBMISSIONS_BY_STATUS + status).then((res) => {
        dispatch({type: GET_SUBMISSION_LIST_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: GET_SUBMISSION_LIST_REJECTED, payload: err})
    })
};
