import axios from "axios/index";
import {UPDATE_FIST_LAST_NAME, UPDATE_NICKNAME} from '../../constants/user-rest-clinet'
import {UPDATE_USER_PROFILE_FULFILLED, UPDATE_USER_PROFILE_REJECTED} from '../../constants/user/user-constants'

export const updateUserFirstLastName = (userId, token, firstName, lastName) => (dispatch, getState) => {
    return axios.post([UPDATE_FIST_LAST_NAME, userId, token, firstName, lastName].join('/'))
        .then((res) => {
            dispatch({type: UPDATE_USER_PROFILE_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: UPDATE_USER_PROFILE_REJECTED, payload: err.response})
        })
};

export const updateUserNickname = (userId, token, nickname) => (dispatch, getState) => {
    return axios.post([UPDATE_NICKNAME, userId, token , nickname].join('/'))
        .then((res) => {
            dispatch({type: UPDATE_USER_PROFILE_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: UPDATE_USER_PROFILE_REJECTED, payload: err.response})
        })

};
