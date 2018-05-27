import {FETCH_ART_POSTS_REJECTED, FETCH_ART_POSTS_FULFILLED}  from "../../constants/post/posts-constants"

export default function reducer(state =
																{
																	fetched: false,
																	error: null,
																	fetching: true
																}
	, action) {

	switch (action.type) {
		case FETCH_ART_POSTS_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case FETCH_ART_POSTS_FULFILLED: {
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
