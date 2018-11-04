import {INIT_SUBMISSION_FULFILLED, INIT_SUBMISSION_REJECTED} from "../../constants/submission/supmissionConstants";

export function submission(state =
                               {
                                   data: null,
                                   fetching: false,
                                   fetched: false,
                                   error: null
                               }
    , action) {

    switch (action.type) {
        case INIT_SUBMISSION_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case INIT_SUBMISSION_FULFILLED: {
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

