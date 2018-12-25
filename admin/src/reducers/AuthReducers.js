import {
    LOGIN_FULFILLED,
    LOGIN_REJECTED,
    UUID_FULFILLED,
    UUID_REJECTED,
    VERIFY_VERIFICATION_FULFILLED,
    VERIFY_VERIFICATION_REJECTED
} from "../constants/user/AuthConstants"

export function login(state =
                          {
                              data: null,
                              fetching: false,
                              fetched: false,
                              error: null
                          }
    , action) {

    switch (action.type) {
        case LOGIN_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case LOGIN_FULFILLED: {
            if (action.payload != null && action.payload.user.user.status === "ADMINISTRATOR") {
                return {
                    ...state,
                    fetching: false,
                    fetched: true,
                    data: action.payload,
                    error: null
                }
            } else {
                return {...state, fetching: false, error: "NOT AN ADMIN", data: null}
            }
        }
        default: {
            return {...state}
        }
    }
}


export function uuid(state =
                         {
                             data: null,
                             fetching: false,
                             fetched: false,
                             error: null
                         }
    , action) {

    switch (action.type) {
        case UUID_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case UUID_FULFILLED: {
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

export function verify(state =
                           {
                               data: null,
                               fetching: false,
                               fetched: false,
                               error: null
                           }
    , action) {

    switch (action.type) {
        case VERIFY_VERIFICATION_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case VERIFY_VERIFICATION_FULFILLED: {
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

