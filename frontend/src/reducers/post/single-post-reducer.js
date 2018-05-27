import {FETCH_SINGLE_POST_FULFILLED, FETCH_SINGLE_POST_REJECTED} from "../../constants/post/posts-constants"

export default function reducer(state =
																{
																	fetched: false,
																	error: null
																}
	, action) {

	switch (action.type) {
		case FETCH_SINGLE_POST_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case FETCH_SINGLE_POST_FULFILLED: {
			return {
				...state,
				fetching: false,
				fetched: true,
				post: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
