// export const HOST = 'https://youngfolks.ru/';
export const HOST = typeof window === 'undefined' ? "backend:8080" : window.location.protocol + "//" + window.location.hostname +  "/";
