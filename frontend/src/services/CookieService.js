import Cookies from 'universal-cookie';
import React from "react";
import {validateToken} from "../actions/user/AuthActions";

const cookies = new Cookies();

export const TOKEN = "token";
export const USER = "user";
export const FB_USER = "fbUser";
export const VK_USER = "vkUser";

export const setAuthCookie = (user, token) => {
    cookies.set(TOKEN, token);
    cookies.set(USER, user.user);
    cookies.set(FB_USER, user.fbUser);
    cookies.set(VK_USER, user.vkUser);
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

export const cleanUserCookies = () => {
    cookies.remove(TOKEN);
    cookies.remove(USER);
    cookies.remove(FB_USER);
    cookies.remove(VK_USER);
};


export const getCookieByKey = (key) => {
    return cookies.get(key);
};

export const isTokenValid = async (userId, token) => {
    return await validateToken(userId, token);

};

