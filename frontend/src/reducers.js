import {combineReducers} from "redux"
import native from './reducers/post/native-post-reducer'
import art from './reducers/post/art-post-reducer'
import sets from './reducers/post/sets-post-reducer'
import single from './reducers/post/single-post-reducer'
import related from './reducers/post/related-posts-reducer'
import topNative from './reducers/post/top-native-reducer'
import topSets from './reducers/post/top-sets-reducer'
import searchPosts from './reducers/post/search-post-reducer'
import window from './reducers/window-reducer'
import loginLogout from './reducers/core/login-logout-reducer'
import facebook from './reducers/user/facebook-login-reducer'
import savedPosts from './reducers/user/dashboard/saved-posts-reducer'
import savedPhotos from './reducers/user/dashboard/saved-photos-reducer'
import savePost from './reducers/user/dashboard/save-post-to-dashboard-reducer'
import deletePost from './reducers/user/dashboard/delete-post-from-dashboard'
import postExistenceByUser from './reducers/post/post-existence-by-user-reducer'
import {firstLastNameUpdate, nickNameUpdate} from './reducers/user/profileRedicers'
import {login, register, requestPassword, uuid, reset, verify, socialUser} from './reducers/user/auth/authReducers'
import {upload, submissionPicsList} from './reducers/files/uploadReducers'
import {country} from './reducers/meta/metaReducers';
import {submission} from "./reducers/submission/submissionReducers";
import {routerReducer as routing} from 'react-router-redux';


export default combineReducers({
    native,
    sets,
    art,
    single,
    related,
    topNative,
    topSets,
    searchPosts,
    window,
    loginLogout,
    facebook,
    savedPosts,
    savedPhotos,
    savePost,
    deletePost,
    postExistenceByUser,
    login, register, requestPassword, uuid, reset, verify, socialUser,
    firstLastNameUpdate, nickNameUpdate,
    upload, submissionPicsList,
    country,
    submission,
    routing
})
