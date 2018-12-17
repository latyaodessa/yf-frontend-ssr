import {UPDATE_USER_PROFILE_FULFILLED, UPDATE_USER_PROFILE_REJECTED} from "../../constants/user/user-constants";

export function firstLastNameUpdate(state =
                                        {
                                            data: null,
                                            fetching: false,
                                            fetched: false,
                                            error: null
                                        }
    , action) {

    switch (action.type) {
        case UPDATE_USER_PROFILE_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case UPDATE_USER_PROFILE_FULFILLED: {
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

export function nickNameUpdate(state =
                                   {
                                       data: null,
                                       fetching: false,
                                       fetched: false,
                                       error: null
                                   }
    , action) {

    switch (action.type) {
        case UPDATE_USER_PROFILE_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case UPDATE_USER_PROFILE_FULFILLED: {
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
