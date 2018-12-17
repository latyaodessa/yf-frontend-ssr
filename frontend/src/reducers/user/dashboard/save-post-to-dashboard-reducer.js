import {SAVE_POST_TO_DASHBOARD_FULFILLED, SAVE_POST_TO_DASHBOARD_REJECTED} from "../../../constants/user/user-constants"

export default function reducer(state =
                                    {
                                        saved: null,
                                        fetching: null,
                                        fetched: false,
                                        error: null
                                    }
    , action) {

    switch (action.type) {
        case SAVE_POST_TO_DASHBOARD_REJECTED: {
            return {...state, fetching: false, error: action.payload}
        }
        case SAVE_POST_TO_DASHBOARD_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                saved: action.payload
            }
        }
        default: {
            return {...state}
        }
    }
}
