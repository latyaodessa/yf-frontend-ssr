import {
    FETCH_EXCLUSIVE_POSTS_REJECTED,
    FETCH_EXCLUSIVE_POSTS_FULFILLED
} from "../../constants/post/posts-constants";

export function exclusiveList(state =
                                   {
                                       post: null,
                                       fetching: false,
                                       fetched: false,
                                       error: null
                                   }
    , action) {

    switch (action.type) {
        case FETCH_EXCLUSIVE_POSTS_REJECTED: {
            return {...state, fetching: false, error: action.payload, post: null}
        }
        case FETCH_EXCLUSIVE_POSTS_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                post: action.payload,
                error: null
            }
        }
        default: {
            return {...state}
        }
    }
}


