import axios from "axios"
import {
    FIND_ART_FROM_TO,
    FIND_NATIVE_FROM_TO,
    FIND_SETS_FROM_TO,
    FIND_TOP_NATIVE_FROM_TO,
    FIND_TOP_SETS_FROM_TO,
    SEARCH_POSTS,
    FIND_PUBLICATION_BY_TYPE
} from '../../constants/post-rest-client'
import {
    FETCH_ART_POSTS_FULFILLED,
    FETCH_ART_POSTS_REJECTED,
    FETCH_NATIVE_POSTS_FULFILLED,
    FETCH_NATIVE_POSTS_REJECTED,
    FETCH_SETS_POSTS_FULFILLED,
    FETCH_SETS_POSTS_REJECTED,
    FETCH_TOP_NATIVE_FULFILLED,
    FETCH_TOP_NATIVE_REJECTED,
    FETCH_TOP_SETS_FULFILLED,
    FETCH_TOP_SETS_REJECTED,
    SEARCH_POST_FULFILLED,
    SEARCH_POST_REJECTED
} from '../../constants/post/posts-constants';

const PUB_TYPE_NATIVE = "NATIVE";
const PUB_TYPE_SETS = "SETS";
const PUB_TYPE_ART = "ART";


export const fetchNativePosts = (from, to) => (dispatch, getState) => {
    return axios.get([FIND_PUBLICATION_BY_TYPE, PUB_TYPE_NATIVE, from, to].join("/"))
        .then((res) => {
            dispatch({type: FETCH_NATIVE_POSTS_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_NATIVE_POSTS_REJECTED, payload: err})
        })

};


export const fetchArtPosts = (from, to) => (dispatch) => {
    return axios.get([FIND_PUBLICATION_BY_TYPE, PUB_TYPE_ART, from, to].join("/"))
        .then((res) => {
            dispatch({type: FETCH_ART_POSTS_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_ART_POSTS_REJECTED, payload: err})
        })

};


export const fetchSetsPosts = (from, to) => (dispatch, getState) => {
    return axios.get([FIND_PUBLICATION_BY_TYPE, PUB_TYPE_SETS, from, to].join("/"))
        .then((res) => {
            dispatch({type: FETCH_SETS_POSTS_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_SETS_POSTS_REJECTED, payload: err})
        })

}

export function fetchTopSets(from, to) {
    return function (dispatch) {
        axios.get([FIND_TOP_SETS_FROM_TO, from, to].join("/"))
            .then((res) => {
                dispatch({type: FETCH_TOP_SETS_FULFILLED, payload: res.data})
            })
            .catch((err) => {
                dispatch({type: FETCH_TOP_SETS_REJECTED, payload: err})
            })
    }
}


export const fetchTopNative = (from, to) => dispatch => {
    return axios.get([FIND_TOP_NATIVE_FROM_TO, from, to].join("/"))
        .then((res) => {
            dispatch({type: FETCH_TOP_NATIVE_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_TOP_NATIVE_REJECTED, payload: err})
        })
};


export const searchPosts = (query) => (dispatch) => {
    return axios.get(SEARCH_POSTS + "?query=" + query)
        .then((res) => {
            dispatch({type: SEARCH_POST_FULFILLED, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: SEARCH_POST_REJECTED, payload: err})
        })

};
