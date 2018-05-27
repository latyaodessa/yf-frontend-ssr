import {FETCH_TOP_SETS_FULFILLED, FETCH_TOP_SETS_REJECTED} from "../../constants/post/posts-constants"

export default function reducer(state =
																{
																	fetched: false,
																	error: null
																}
	, action) {

	switch (action.type) {
		case FETCH_TOP_SETS_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case FETCH_TOP_SETS_FULFILLED: {
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
