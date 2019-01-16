import {combineReducers} from 'redux'
import counter from './counter'
import {publication, submission, submissionList} from "../reducers/SubmissionReducers";
import {login, uuid, verify} from "../reducers/AuthReducers";
import {images, uploadToCloud} from "../reducers/StorageReducers";

export default combineReducers({
    counter,
    submissionList, submission, publication,
    login, uuid, verify,
    images, uploadToCloud
})
