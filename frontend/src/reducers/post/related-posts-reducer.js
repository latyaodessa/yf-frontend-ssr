import {FETCH_RELATED_POSTS_FULFILLED, FETCH_RELATED_POSTS_REJECTED} from "../../constants/post/posts-constants"

export default function reducer(state =
																{
																	posts:"",
																	fetched: false,
																	error: null
																}
	, action) {

	switch (action.type) {
		case FETCH_RELATED_POSTS_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case FETCH_RELATED_POSTS_FULFILLED: {
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
