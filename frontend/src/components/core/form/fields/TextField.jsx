import {EMAIL_ADDRESS} from "../../../../messages/auth/auth";
import style from './style.scss'

const errorInput = 'error-input';

export const TextFieldEmail = (params) => {
    let error = null;
    let errorStyle = null;

    if (!params.data.valid) {
        error = params.data.errorMessage;
        errorStyle = errorInput;
    }
    return <div className="form-item">
        <style jsx>{style}</style>
        <label htmlFor={params.label}/>
        <input className={errorStyle} type="email" name='email' autoComplete='email' required="required"
               placeholder={EMAIL_ADDRESS} onChange={evt => params.updateInputValue(evt)}/>
        {error && <label className={"error-label"}>{"*" + error}</label>}
    </div>
};

export const RequiredTextField = (params) => {
    let error = null;
    let errorStyle = null;

    if (!params.data.valid) {
        error = params.data.errorMessage;
        errorStyle = errorInput;
    }
    return <div className="form-item">
        <style jsx>{style}</style>
        <label htmlFor={params.label}/>
        <input className={errorStyle} type="text" name={params.name} autoComplete='text' required="required"
               placeholder={params.placeholder} onChange={evt => params.updateInputValue(evt)}
               defaultValue={params.data.value}/>
        {error && <label className={"error-label"}>{"*" + error}</label>}
    </div>
};


export const TextFieldPassword = (params) => {
    let error = null;
    let errorStyle = null;

    if (!params.data.valid) {
        error = params.data.errorMessage;
        errorStyle = errorInput;
    }

    let passwordType = params.current ? "current-password" : "new-password";


    return <div className="form-item">
        <style jsx>{style}</style>
        <label htmlFor={params.label}/>
        <input className={errorStyle} type="password" autoComplete={passwordType} name={params.name}
               required="required"
               placeholder={params.placeholder} onChange={evt => params.updateInputValue(evt)}/>
        {error && <label className={"error-label"}>{"*" + error}</label>}
    </div>
};

