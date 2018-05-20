import {GET_SAVED_PHOTOS_FULFILLED, GET_SAVED_PHOTOS_REJECTED} from "../../../constants/user/user-constants"

export default function reducer(state =
																{
																	savedPhotos: null,
																	fetching: null,
																	fetched: false,
																	error: null
																}
	, action) {

	switch (action.type) {
		case GET_SAVED_PHOTOS_REJECTED: {
			return {...state, fetching: false, error: action.payload}
		}
		case GET_SAVED_PHOTOS_FULFILLED: {
			return {
				...state,
				fetching: false,
				fetched: true,
				savedPhotos: action.payload
			}
		}
		default: {
			return {...state}
		}
	}
}
