import axios from "axios"

import {CREATE_FACEBOOK_USER_FULFILLED, CREATE_FACEBOOK_USER_REJECTED, GET_USER_REJECTED, GET_USER_FULFILLED, CREATE_VK_USER_FULFILLED, CREATE_VK_USER_REJECTED,
				USER_LOGIN} from "../../constants/user/user-constants"
import {CREATE_FB_USER, GET_VK_USER_BY_SOCIAL_ID, GET_FB_USER_BY_SOCIAL_ID, CREATE_VK_USER} from '../../constants/user-rest-clinet'

const STATUS_200 = 200;

export function getUserByVKID(userId) {
	return function (dispatch) {
		return axios.get(GET_VK_USER_BY_SOCIAL_ID + userId)
			.then((res) => {
				if(res.status === STATUS_200){
					handleLocalStorage(res.data);
				}
				dispatch({type: GET_USER_FULFILLED, payload: res.data});
				if(res.data){
					dispatch({type: USER_LOGIN});
				}
			})
			.catch((err)=> {
				dispatch({type: GET_USER_REJECTED, payload: err})
			})
	}
}



export function getUserByFBID(userId) {
    return function (dispatch) {
        return axios.get(GET_FB_USER_BY_SOCIAL_ID + userId)
            .then((res) => {
                if(res.status === STATUS_200){
                    handleLocalStorage(res.data);
                }
                dispatch({type: GET_USER_FULFILLED, payload: res.data});
                if(res.data){
                    dispatch({type: USER_LOGIN});
                }
            })
            .catch((err)=> {
                dispatch({type: GET_USER_REJECTED, payload: err})
            })
    }
}

function handleLocalStorage(res){
	console.log(res);
	localStorage.setItem('user_id', res.user.id);
	// localStorage.setItem('user_type', 'VK');
	if(res.vkUser) {
        localStorage.setItem('user_vk_id', res.vkUser.id);
        localStorage.setItem('user_first_name', res.vkUser.firstName);
        localStorage.setItem('user_last_name', res.vkUser.lastName);
    }

    if(res.fbUser) {
        localStorage.setItem('user_fb_id', res.fbUser.id);
        localStorage.setItem('user_first_name', res.fbUser.first_name);
        localStorage.setItem('user_last_name', res.fbUser.last_name);
    }

}

export function createVkUser(userId) {
	return function (dispatch) {
		return axios.post(CREATE_VK_USER + userId)
			.then((res) => {
				if(res.status == STATUS_200){
					handleLocalStorage(res.data);
				}
				dispatch({type: CREATE_VK_USER_FULFILLED, payload: res.data});
				dispatch({type: USER_LOGIN});
			})
			.catch((err)=> {
				dispatch({type: CREATE_VK_USER_REJECTED, payload: err})
			})
	}
}

export function createFBUser(fbUser) {
	return function (dispatch) {
		return axios.post(CREATE_FB_USER, fbUser)
			.then((res) => {
				if(res.status == STATUS_200){
					handleLocalStorage(res.data);
				}
				dispatch({type: CREATE_FACEBOOK_USER_FULFILLED, payload: res.data});
				dispatch({type: USER_LOGIN});
			})
			.catch((err)=> {
				dispatch({type: CREATE_FACEBOOK_USER_REJECTED, payload: err})
			})
	}
}
