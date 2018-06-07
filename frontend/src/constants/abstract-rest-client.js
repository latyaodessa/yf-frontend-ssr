// export const HOST = 'https://youngfolks.ru/';
export const HOST = typeof window === 'undefined' ? "http://nginx/" : window.location.protocol + "//" + window.location.hostname +  "/";
