import axios from "axios/index";
import {
    SEARCH_COUNTRY_FULFILLED,
    SEARCH_COUNTRY_LOADING,
    SEARCH_COUNTRY_REJECTED
} from "../constants/meta/MetaConstants";
import {COUNTRIES_ENDPOINT} from "../constants/DummyRestClient";

export const getCountries = () => dispatch => {
    dispatch({type: SEARCH_COUNTRY_LOADING});
    return axios.get(COUNTRIES_ENDPOINT).then((res) => {
        dispatch({type: SEARCH_COUNTRY_FULFILLED, payload: res.data});
    }).catch((err) => {
        dispatch({type: SEARCH_COUNTRY_REJECTED, payload: err})
    })
};

