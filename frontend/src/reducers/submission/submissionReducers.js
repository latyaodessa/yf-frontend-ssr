import {
    INIT_SUBMISSION_FULFILLED,
    INIT_SUBMISSION_REJECTED,
    SUBMISSIONS_LIST_FULFILLED,
    SUBMISSIONS_LIST_REJECTED
} from "../../constants/submission/supmissionConstants";

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

export function submissionsList(state =
                                    {
                                        data: null,
                                        fetching: false,
                                        fetched: false,
                                        error: null
                                    }
    , action) {

    switch (action.type) {
        case SUBMISSIONS_LIST_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case SUBMISSIONS_LIST_FULFILLED: {
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

