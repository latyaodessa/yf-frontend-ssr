import {HOST} from './../abstract-rest-client'
const BACKEND_REST = "yf-services/rest/";


export const LOGIN_REQUEST = HOST() + BACKEND_REST + "auth/login";
export const REGISTER_REQUEST = HOST() + BACKEND_REST + "auth/register";
export const REQUEST_RESET_PASSWORD_REQUEST = HOST() + BACKEND_REST + "auth/reset/email/request/";
export const VALIDATE_UUIID_REQUEST = HOST() + BACKEND_REST + "auth/validate/";
export const RESET_PASSWORD_REQUEST = HOST() + BACKEND_REST + "auth/reset/";
