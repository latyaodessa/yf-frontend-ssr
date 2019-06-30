import {
    SEARCH_COUNTRY_FULFILLED,
    SEARCH_COUNTRY_LOADING,
    SEARCH_COUNTRY_REJECTED
} from "../../constants/meta/MetaConstants";

export function countries(state =
                              {
                                  data: null,
                                  fetching: false,
                                  error: null
                              }
    , action) {

    switch (action.type) {
        case SEARCH_COUNTRY_LOADING: {
            return {...state, fetching: true, error: action.payload, data: null}
        }
        case SEARCH_COUNTRY_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case SEARCH_COUNTRY_FULFILLED: {
            return {
                ...state,
                fetching: false,
                data: action.payload,
                error: null
            }
        }
        default: {
            return {...state}
        }
    }
}
