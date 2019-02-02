// export const HOST = () => 'http://localhost:8080/';
// export const STORAGE_HOST = () => 'http://localhost:8081/';
//
export const HOST = () => {
    let backend = typeof window === 'undefined' ? 'http://backend:8080/' : window.location.protocol + "//" + window.location.hostname +  "/";
    return backend;
};

export const STORAGE_HOST = () => {
    let backend = typeof window === 'undefined' ? 'http://storage:8080/' : window.location.protocol + "//" + window.location.hostname +  "/";
    return backend;
};

// export const HOST = () =>  'http://194.1.239.223:8080/';
// export const STORAGE_HOST = () =>  'http://194.1.239.223:9090/';
//
// export const HOST = () =>  'https://youngfolks.ru/';
// export const STORAGE_HOST = () =>  'https://youngfolks.ru/';
