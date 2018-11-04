import axios from "axios/index";
import {SEARCH_COUNTRY_FULFILLED, SEARCH_COUNTRY_REJECTED} from "../constants/meta/MetaConstants";
import {SEARCH_COUNTRIES} from "../constants/meta-rest-client";

export const searchCountry = (countryTextSearch) => (dispatch, getState) => {
    return axios.post(SEARCH_COUNTRIES, countryTextSearch).then((res) => {
        dispatch({type: SEARCH_COUNTRY_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: SEARCH_COUNTRY_REJECTED, payload: err})
    })
};

