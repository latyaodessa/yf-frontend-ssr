import {FETCH_NATIVE_POSTS_FULFILLED, FETCH_NATIVE_POSTS_REJECTED} from "../../constants/post/posts-constants"

export default function reducer(state =
                                    {
                                        fetched: false,
                                        error: null,
                                        fetching: true
                                    }
    , action) {

    switch (action.type) {
        case FETCH_NATIVE_POSTS_REJECTED: {
            return {...state, fetching: false, error: action.payload}
        }
        case FETCH_NATIVE_POSTS_FULFILLED: {
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
