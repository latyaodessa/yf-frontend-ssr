import {CREATE_FACEBOOK_USER_FULFILLED, CREATE_FACEBOOK_USER_REJECTED} from "../../constants/user/user-constants"

export default function reducer(state =
																{
																	user: null,
																	fetching: null,
																	fetched: false,
																	error: null
																}
	, action) {

	switch (action.type) {
		case CREATE_FACEBOOK_USER_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case CREATE_FACEBOOK_USER_FULFILLED: {
			return {
				...state,
				fetching: false,
				fetched: true,
				user: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
