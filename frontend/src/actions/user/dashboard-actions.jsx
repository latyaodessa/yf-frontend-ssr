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

    return axios.post([SAVE_POST_TO_DASHBOARD,publication_id, userId].join("/"), {})
        .then((res) => {
            dispatch({type: SAVE_POST_TO_DASHBOARD_FULFILLED, payload: res});

        })
        .catch((err) => {
            dispatch({type: SAVE_POST_TO_DASHBOARD_REJECTED, payload: err})
        })

};

export function deletePostFromDashboard(id, post_id, user_id) {
    var req = {
        id: id,
        post_id: post_id,
        user_id: user_id
    }

    return function (dispatch) {
        axios.post(DELETE_POST_FROM_DASHBOARD, req)
            .then((res) => {
                dispatch({type: DELETE_POST_FROM_DASHBOARD_FULFILLED, payload: res});
                location.reload();

            })
            .catch((err) => {
                dispatch({type: DELETE_POST_FROM_DASHBOARD_REJECTED, payload: err})
            })
    }
}
