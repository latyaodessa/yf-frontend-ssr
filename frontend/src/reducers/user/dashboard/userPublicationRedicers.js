import {FETCH_USER_SAVED_PULICATIONS_FULFILLED, FETCH_USER_SAVED_PULICATIONS_REJECTED} from "../../../constants/post/posts-constants";

export function userPublications(state =
                            {
                                data: null,
                                fetching: false,
                                fetched: false,
                                error: null
                            }
    , action) {

    switch (action.type) {
        case FETCH_USER_SAVED_PULICATIONS_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case FETCH_USER_SAVED_PULICATIONS_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
                error: null
            }
        }
        default: {
            return {...state}
        }
    }
}
