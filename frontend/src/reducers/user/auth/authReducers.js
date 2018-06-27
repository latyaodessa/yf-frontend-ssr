import {
    LOGIN_FULFILLED,
    LOGIN_REJECTED,
    REGISTER_REJECTED,
    REGISTER_FULFILLED,
    REQUEST_RESET_PASSWORD_REJECTED,
    REQUEST_RESET_PASSWORD_FULFILLED,
    UUID_REJECTED,
    UUID_FULFILLED,
    RESET_PASSWORD_REJECTED,
    RESET_PASSWORD_FULFILLED
} from "../../../constants/user/AuthConstants"

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

export function register(state =
                             {
                                 data: null,
                                 fetching: false,
                                 fetched: false,
                                 error: null
                             }
    , action) {

    switch (action.type) {
        case REGISTER_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case REGISTER_FULFILLED: {
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

export function requestPassword(state =
                                    {
                                        data: null,
                                        fetching: false,
                                        fetched: false,
                                        error: null
                                    }
    , action) {

    switch (action.type) {
        case REQUEST_RESET_PASSWORD_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case REQUEST_RESET_PASSWORD_FULFILLED: {
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

export function reset(state =
                          {
                              data: null,
                              fetching: false,
                              fetched: false,
                              error: null
                          }
    , action) {

    switch (action.type) {
        case RESET_PASSWORD_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case RESET_PASSWORD_FULFILLED: {
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

