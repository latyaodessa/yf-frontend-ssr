import {SEARCH_POST_REJECTED, SEARCH_POST_FULFILLED} from "../../constants/post/posts-constants"

export default function reducer(state =
																{
																	posts:"",
																	fetched: false,
																	error: null
																}
	, action) {

	switch (action.type) {
		case SEARCH_POST_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case SEARCH_POST_FULFILLED: {
			return {
				...state,
				fetching: false,
				fetched: true,
				posts: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
