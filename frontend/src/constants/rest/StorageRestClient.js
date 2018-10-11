import {HOST, STORAGE_HOST} from './../abstract-rest-client'
const BACKEND_REST = "yf-services/rest/";
const STORAGE_REST = "storage/";

export const SAVE_UPLOADED_PIC = HOST() + BACKEND_REST + "user/update/profilepic";
export const UPLOAD_PROFILE_PIC = STORAGE_HOST() + STORAGE_REST + "upload/profile";
export const UPLOAD_PICS_FOR_SUBMISSION = STORAGE_HOST() + STORAGE_REST + "submission/pic";
