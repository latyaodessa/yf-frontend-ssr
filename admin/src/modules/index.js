import {combineReducers} from 'redux'
import counter from './counter'
import {submissionList} from "../reducers/SubmissionReducers";

export default combineReducers({
    counter,
    submissionList
})
