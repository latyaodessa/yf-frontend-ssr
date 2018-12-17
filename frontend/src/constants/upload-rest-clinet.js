import {HOST} from './abstract-rest-client'

export const CLOUDINARY_UPLOAD_PRESET = 'profilepics';
export const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/youngfolks/image/upload';


const BACKEND_REST = "yf-services/rest/";

export const BUCKET_TYPES = {
    PROFILES: "PROFILES",
    SETS: "SETS",
    IDS: "IDS"
};

export const UPLOAD_FILE = HOST() + BACKEND_REST + "storage/upload/url/";
