import axios from "axios"

import {GET_USER_FULFILLED, GET_USER_REJECTED} from "../../constants/user/user-constants"

import {REGISTER_FULFILLED, REGISTER_REJECTED} from "../../constants/user/AuthConstants";

import {
    CREATE_FB_USER,
    CREATE_VK_USER,
    GET_FB_USER_BY_SOCIAL_ID,
    GET_VK_USER_BY_SOCIAL_ID
} from '../../constants/user-rest-clinet'


export const getUserByVKID = (userId) => (dispatch, getState) => {
    return axios.get(GET_VK_USER_BY_SOCIAL_ID.concat(userId))
        .then((res) => {
            dispatch({type: GET_USER_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: GET_USER_REJECTED, payload: err.response})
        })

};

export const createVkUser = (socialId, email, password) => (dispatch, getState) => {
    let requestObj = {
        user: email,
        password: password
    };
    console.log(requestObj);
    return axios.post(CREATE_VK_USER + socialId, requestObj)
        .then((res) => {
            dispatch({type: REGISTER_FULFILLED, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: REGISTER_REJECTED, payload: err.response})
        })

};

export const getUserByFBID = (userId) => (dispatch, getState) => {
    return axios.get(GET_FB_USER_BY_SOCIAL_ID.concat(userId))
        .then((res) => {
            dispatch({type: GET_USER_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: GET_USER_REJECTED, payload: err.response})
        })

};


export const createFBUser = (fbUser, user, password) => (dispatch, getState) => {
    return axios.post(CREATE_FB_USER.concat([user, password].join('/')), fbUser)
        .then((res) => {
            dispatch({type: REGISTER_FULFILLED, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: REGISTER_REJECTED, payload: err.response})
        })

};
