import axios from "axios"
import {
    FIND_PUBLICATION_BY_VK_POST_ID,
    FIND_RELATED_PUBLICATIONS,
    IS_POST_ALREADY_EXIST_BY_USER,
    FIND_PUBLICATION_BY_LINK
} from '../../constants/post-rest-client'
import {
    FETCH_RELATED_POSTS_FULFILLED,
    FETCH_RELATED_POSTS_REJECTED,
    FETCH_SINGLE_POST_FULFILLED,
    FETCH_SINGLE_POST_REJECTED
} from '../../constants/post/posts-constants';
import {GET_IS_POST_EXIST_FULFILLED, GET_IS_POST_EXIST_REJECTED} from "../../constants/user/user-constants"

export const fetchPostPictures = (postId) => {
   return axios.get(FIND_PUBLICATION_BY_VK_POST_ID + postId)
        .then((res) => {
            // console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            return;
        })
};

export const fetchPublicationDetails = (link) => dispatch => {
    return axios.get(FIND_PUBLICATION_BY_LINK + "/" + link)
        .then((res) => {
            dispatch({type: FETCH_SINGLE_POST_FULFILLED, payload: res.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_SINGLE_POST_REJECTED, payload: err})
        })
};

export const isPostAlreadySavedByUser = (postId, userId) => dispatch => {
    return axios.get(IS_POST_ALREADY_EXIST_BY_USER + "/" + userId + "/" + postId)
        .then((res) => {
            dispatch({type: GET_IS_POST_EXIST_FULFILLED, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: GET_IS_POST_EXIST_REJECTED, payload: err})
        })
};


export const getRelatedPosts = (publication) => dispatch => {
    return axios.post(FIND_RELATED_PUBLICATIONS, publication)
        .then((res) => {
            dispatch({type: FETCH_RELATED_POSTS_FULFILLED, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: FETCH_RELATED_POSTS_REJECTED, payload: err})
        })
};
