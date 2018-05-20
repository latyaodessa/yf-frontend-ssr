import {DELETE_POST_FROM_DASHBOARD_FULFILLED, DELETE_POST_FROM_DASHBOARD_REJECTED} from "../../../constants/user/user-constants"

export default function reducer(state =
																{
																	deleted: false,
																	deleting: true,
																	error: null
																}
	, action) {

	switch (action.type) {
		case DELETE_POST_FROM_DASHBOARD_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case DELETE_POST_FROM_DASHBOARD_FULFILLED: {
			return {
				...state,
				deleted: true,
				deleting: false
			}
		}
		default: {
			return {...state}
		}
	}
}
