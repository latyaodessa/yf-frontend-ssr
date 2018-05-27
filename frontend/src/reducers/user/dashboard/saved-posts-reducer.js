import {GET_SAVED_POSTS_FULFILLED, GET_SAVED_POSTS_REJECTED} from "../../../constants/user/user-constants"

export default function reducer(state =
																{
																	savedPosts: null,
																	fetching: null,
																	fetched: false,
																	error: null
																}
	, action) {

	switch (action.type) {
		case GET_SAVED_POSTS_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case GET_SAVED_POSTS_FULFILLED: {
			return {
				...state,
				fetching: false,
				fetched: true,
				savedPosts: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
