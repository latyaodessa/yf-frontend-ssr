import {GET_USER_FULFILLED, GET_USER_REJECTED} from "../../constants/user/user-constants"

export default function reducer(state =
																{
																	user:null,
																	fetching:false,
																	fetched: false,
																	error: null
																}
	, action) {

	switch (action.type) {
		case GET_USER_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case GET_USER_FULFILLED: {
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
