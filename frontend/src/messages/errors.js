export const ERRORS = {
    WRONG_PASSWORD: {name: "WRONG_PASSWORD", transaction: "Неверный пароль"},
    DEFAULT_ERROR: {name: "DEFAULT_ERROR", transaction: "Ошибка на сервере"},
    NOT_EXIST: {name: "NOT_EXIST", transaction: "Пользователь с такими данными не зарегистрирован"},
    NOT_AUTHORIZED: {name: "NOT_AUTHORIZED", transaction: "Пользователь не авторизован"},
    BLOCKED: {name: "BLOCKED", transaction: "Пользователь заблокирован"},
    USER_ALREADY_EXIST: {
        name: "USER_ALREADY_EXIST",
        transaction: "Пользователь с таким Email адресом уже зарегистрирован"
    },
    PASSWORDS_NOT_MATCING: {name: "PASSWORDS_NOT_MATCING", transaction: "Пароли не совпадают"},
    VERIFICATION_NOT_VALID: {name: "VERIFICATION_NOT_VALID", transaction: "Верификация не действительна"},
    PASSWORD_NOT_VALID: {name: "PASSWORD_NOT_VALID", transaction: "Пароль должен содержать не менее 6 символов (только латиница) без пробелов."}
};
