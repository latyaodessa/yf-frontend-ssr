import axios from "axios"

import {CREATE_FACEBOOK_USER_FULFILLED, CREATE_FACEBOOK_USER_REJECTED, GET_USER_REJECTED, GET_USER_FULFILLED, CREATE_VK_USER_FULFILLED, CREATE_VK_USER_REJECTED,
				USER_LOGIN} from "../../constants/user/user-constants"
import {CREATE_FB_USER, GET_USER_BY_ID, CREATE_VK_USER} from '../../constants/user-rest-clinet'

const STATUS_200 = 200;

export function getUserByID(userId) {
	return function (dispatch) {
		axios.get(GET_USER_BY_ID + userId)
			.then((res) => {
				if(res.status == STATUS_200){
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
	localStorage.clear();
	localStorage.setItem('user_id', res.id);
	localStorage.setItem('user_type',res.yf_user_type);
	localStorage.setItem('user_first_name', res.first_name);
	localStorage.setItem('user_last_name', res.last_name);
	localStorage.setItem('user_thumbnail', res.thumbnail);

}

export function createVkUser(userId) {
	return function (dispatch) {
		axios.post(CREATE_VK_USER + userId)
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
		axios.post(CREATE_FB_USER, fbUser)
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
