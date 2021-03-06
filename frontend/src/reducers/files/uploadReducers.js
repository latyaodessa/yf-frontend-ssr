import {UPLOAD_FILE__REJECTED, UPLOAD_FILE_FULFILLED} from "../../constants/files/uploadConstants";

export function upload(state =
                           {
                               data: null,
                               fetching: false,
                               fetched: false,
                               error: null
                           }
    , action) {

    switch (action.type) {
        case UPLOAD_FILE__REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case UPLOAD_FILE_FULFILLED: {
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
