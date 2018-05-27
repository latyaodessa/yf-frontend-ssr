import {HOST} from './abstract-rest-client'

const BACKEND_REST = "yf-services/rest/";

export const FIND_POST_BY_ID = HOST + BACKEND_REST + 'post/';
export const FIND_NATIVE_FROM_TO = HOST + BACKEND_REST +'post/new/yf-photo-native/photo';
export const FIND_ART_FROM_TO = HOST + BACKEND_REST +'post/new/yf-photo-art/photo';
export const FIND_SETS_FROM_TO = HOST + BACKEND_REST +'post/new/yf-photo-sets/photo';

export const FIND_TOP_SETS_FROM_TO = HOST + BACKEND_REST +'post/top/yf-sets-top/photo';
export const FIND_TOP_NATIVE_FROM_TO = HOST + BACKEND_REST +'post/top/yf-native-top/photo';

export const FIND_RELATED_POSTS = HOST + BACKEND_REST +'post/search/related';
export const SEARCH_POSTS = HOST + BACKEND_REST +'post/search/';

export const IS_POST_ALREADY_EXIST_BY_USER = HOST + BACKEND_REST + "dashboard/isexist/post"



