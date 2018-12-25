import {GET_SUB_LIST_FULFILLED, GET_SUB_LIST_REJECTED} from "../constants/storage/uploadConstants";

export function images(state =
                           {
                               data: null,
                               fetching: false,
                               fetched: false,
                               error: null
                           }
    , action) {

    switch (action.type) {
        case GET_SUB_LIST_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case GET_SUB_LIST_FULFILLED: {
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
