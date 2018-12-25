import {
    LOGIN_FULFILLED,
    LOGIN_REJECTED,
    UUID_FULFILLED,
    UUID_REJECTED,
    VERIFY_VERIFICATION_FULFILLED,
    VERIFY_VERIFICATION_REJECTED
} from "../constants/user/AuthConstants";
import {
    LOGIN_REQUEST,
    VALIDATE_TOKEN_REQUEST,
    VALIDATE_UUIID_REQUEST,
    VERIFY_VERIFICATION_REQUEST
} from '../constants/user/AuthRestClient';

import axios from "axios/index";

export const login = (userOrEmail, password) => (dispatch, getState) => {
    let requestObj = {
        user: userOrEmail,
        password: password
    };

    return axios.post(LOGIN_REQUEST, requestObj)
        .then((res) => {
            dispatch({type: LOGIN_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: LOGIN_REJECTED, payload: err.response})
        })

};


export const validateVerificationUUID = (uuid) => (dispatch, getState) => {
    return axios.get(VALIDATE_UUIID_REQUEST.concat(uuid))
        .then((res) => {
            dispatch({type: UUID_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: UUID_REJECTED, payload: err.response.data})
        })

};

export const validateToken = (userId, token) => {
    return axios.get(VALIDATE_TOKEN_REQUEST.concat([userId, token].join("/")))
        .then((res) => {
            return {valid: res.data};
        })
        .catch((err) => {
            return {valid: false, err: err.data};
        })

};


export const verifyVerification = (uuid) => (dispatch, getState) => {
    return axios.get(VERIFY_VERIFICATION_REQUEST.concat(uuid))
        .then((res) => {
            dispatch({type: VERIFY_VERIFICATION_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: VERIFY_VERIFICATION_REJECTED, payload: err.response.data})
        })

};



