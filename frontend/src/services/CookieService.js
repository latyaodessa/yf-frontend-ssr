import Cookies from 'universal-cookie';

const cookies = new Cookies();


export const setAuthCookie = (user, token) => {
    cookies.set("token", token);
    cookies.set("user", user.user);
    cookies.set("fbUser", user.fbUser);
    cookies.set("vkUser", user.vkUser);
};


export const getCookieByKey = (key) => {
    return cookies.get(key);
};

export const isTokenValid = () => {
    return true;
}
