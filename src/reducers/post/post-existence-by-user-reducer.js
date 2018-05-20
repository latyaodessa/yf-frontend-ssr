import {GET_IS_POST_EXIST_FULFILLED, GET_IS_POST_EXIST_REJECTED}  from "../../constants/user/user-constants"

export default function reducer(state =
																{
																	existence: false,
																	fetched: false,
																	error: null,
																	fetching: true
																}
	, action) {

	switch (action.type) {
		case GET_IS_POST_EXIST_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case GET_IS_POST_EXIST_FULFILLED: {
			return {
				...state,
				fetching: false,
				fetched: true,
				existence: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
