import {GET_SUBMISSION_LIST_FULFILLED, GET_SUBMISSION_LIST_REJECTED, FETCH_SUBMISSION_FULFILLED, FETCH_SUBMISSION_REJECTED, PUBLISH_SUBMISSION_REJECTED, PUBLISH_SUBMISSION_FULFILLED} from "../constants/submisson/SupmissionConstants";

export function submissionList(state =
                                   {
                                       data: null,
                                       fetching: false,
                                       fetched: false,
                                       error: null
                                   }
    , action) {

    switch (action.type) {
        case GET_SUBMISSION_LIST_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case GET_SUBMISSION_LIST_FULFILLED: {
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


export function submission(state =
                                   {
                                       data: null,
                                       fetching: false,
                                       fetched: false,
                                       error: null
                                   }
    , action) {

    switch (action.type) {
        case FETCH_SUBMISSION_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case FETCH_SUBMISSION_FULFILLED: {
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

export function publication(state =
                               {
                                   data: null,
                                   fetching: false,
                                   fetched: false,
                                   error: null
                               }
    , action) {

    switch (action.type) {
        case PUBLISH_SUBMISSION_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case PUBLISH_SUBMISSION_FULFILLED: {
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
