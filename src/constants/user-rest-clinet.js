import {HOST} from './abstract-rest-client'

const BACKEND_REST = "yf-services/rest/";

export const GET_USER_BY_ID = HOST + BACKEND_REST + "user/get/";
export const CREATE_FB_USER = HOST + BACKEND_REST +  "user/fb/create/";
export const CREATE_VK_USER = HOST  + BACKEND_REST + "user/vk/create/";

export const GET_SAVED_POSTS = HOST  + BACKEND_REST + "dashboard/saved/posts"
export const GET_SAVED_PHOTOS = HOST + BACKEND_REST + "dashboard/saved/photos"

export const SAVE_POST_TO_DASHBOARD = HOST + BACKEND_REST + "dashboard/save/post"
export const DELETE_POST_FROM_DASHBOARD = HOST + BACKEND_REST + "dashboard/delete/post"



