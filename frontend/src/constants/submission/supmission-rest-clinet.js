import {HOST} from './../abstract-rest-client'

const BACKEND_REST = "yf-services/rest/";

export const INIT_SUBMISSION = HOST() + BACKEND_REST + "submission/init/";
export const UPDATE_SUBMISSION = HOST() + BACKEND_REST + "submission/update/";
export const GET_SUBMISSION_BY_UUID = HOST() + BACKEND_REST + "submission/";
