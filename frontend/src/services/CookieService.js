import Cookies from 'universal-cookie';
import React from "react";
import {validateToken} from "../actions/user/AuthActions";

const cookies = new Cookies();

export const TOKEN = "token";
export const USER = "user";
export const FB_USER = "fbUser";
export const VK_USER = "vkUser";

export const setAuthCookie = (user, token) => {
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 100000 * 360000;
    now.setTime(expireTime);

    const options = {
        expires: now
    };

    cookies.set(TOKEN, token, options);
    cookies.set(USER, user.user, options);
    cookies.set(FB_USER, user.fbUser, options);
    cookies.set(VK_USER, user.vkUser, options);
};

export const verifyLoggedInUser = async () => {
    let user = getCookieByKey(USER);
    let token = getCookieByKey(TOKEN);

    if (!user || !token) {
        cleanUserCookies();
        return false;
    }


    let validation = await isTokenValid(user.id, token);

    if (validation.valid) {
        return true;
    } else {
        cleanUserCookies();
        return false;
    }

};

export const cleanUserCookies = async () => {
    await cookies.remove(TOKEN);
    await cookies.remove(USER);
    await cookies.remove(FB_USER);
    await cookies.remove(VK_USER);
};


export const getCookieByKey = (key) => {
    return cookies.get(key);
};

export const uploadNewProfilePic = async (profilePictureDTO) => {
    let user = await getCookieByKey(USER);
    user.profilePictureDTO = profilePictureDTO;
    await cookies.remove(USER);
    cookies.set(USER, user);
};

export const isTokenValid = async (userId, token) => {
    return await validateToken(userId, token);

};

