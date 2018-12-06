import axios from "axios"

import {
    DELETE_POST_FROM_DASHBOARD_FULFILLED,
    DELETE_POST_FROM_DASHBOARD_REJECTED,
    GET_SAVED_POSTS_FULFILLED,
    GET_SAVED_POSTS_REJECTED,
    SAVE_POST_TO_DASHBOARD_FULFILLED,
    SAVE_POST_TO_DASHBOARD_REJECTED
} from "../../constants/user/user-constants"
import {DELETE_POST_FROM_DASHBOARD, GET_SAVED_POSTS, SAVE_POST_TO_DASHBOARD} from '../../constants/user-rest-clinet'

import {getCookieByKey, TOKEN, USER} from "../../services/CookieService";

export const getSavedPosts = (userId, from, to) => (dispatch) => {
    return axios.get([GET_SAVED_POSTS, userId, from, to].join("/"))
        .then((res) => {
            dispatch({type: GET_SAVED_POSTS_FULFILLED, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: GET_SAVED_POSTS_REJECTED, payload: err})
        })

};


export const savePostToDashboard = (publication_id, userId) => (dispatch, getState) => {
    const req = {
        userId: getCookieByKey(USER).id,
        token: getCookieByKey(TOKEN)
    };
    return axios.post([SAVE_POST_TO_DASHBOARD, publication_id].join("/"), req)
        .then((res) => {
            dispatch({type: SAVE_POST_TO_DASHBOARD_FULFILLED, payload: res});

        })
        .catch((err) => {
            dispatch({type: SAVE_POST_TO_DASHBOARD_REJECTED, payload: err})
        })

};

export const deletePostFromDashboard = (idSavedPost) => (dispatch, getState) => {

    const req = {
        userId: getCookieByKey(USER).id,
        token: getCookieByKey(TOKEN)
    };

    return axios.post([DELETE_POST_FROM_DASHBOARD, idSavedPost].join("/"), req)
        .then((res) => {
            dispatch({type: DELETE_POST_FROM_DASHBOARD_FULFILLED, payload: res});
        })
        .catch((err) => {
            dispatch({type: DELETE_POST_FROM_DASHBOARD_REJECTED, payload: err})
        })
};
