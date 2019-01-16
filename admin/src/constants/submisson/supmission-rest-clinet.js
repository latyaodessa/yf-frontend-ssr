import {HOST} from '../abstract-rest-client';

const BACKEND_REST = "yf-services/rest/";


export const GET_SUBMISSIONS_BY_STATUS = HOST() + BACKEND_REST + "submission/status/";
export const GET_SUBMISSION_BY_UUID = HOST() + BACKEND_REST + "submission/get/";
export const UPDATE_SUBMISSION = HOST() + BACKEND_REST + "submission/update/data/";
export const PUBLISH_SUBMISSION = HOST() + BACKEND_REST + "submission/publish/";

export const PUBLICATION_IMAGES = HOST() + BACKEND_REST + "publication/update/pictures/";
