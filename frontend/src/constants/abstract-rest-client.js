// export const HOST = 'https://youngfolks.ru/';
export const HOST = () => {
    let backend = typeof window === 'undefined' ? 'http://backend:8080/' : window.location.protocol + "//" + window.location.hostname +  "/";
    return backend;
};
