import {SEARCH_COUNTRY_FULFILLED, SEARCH_COUNTRY_REJECTED} from "../../constants/meta/MetaConstants";

export function country(state =
                            {
                                data: null,
                                fetching: false,
                                fetched: false,
                                error: null
                            }
    , action) {

    switch (action.type) {
        case SEARCH_COUNTRY_REJECTED: {
            return {...state, fetching: false, error: action.payload, data: null}
        }
        case SEARCH_COUNTRY_FULFILLED: {
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
