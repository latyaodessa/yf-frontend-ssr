import style from './style.scss';

export const SubmitButton = (params) => {
    let buttonStyle = params.fetching ? 'loading-button' : "button";
    return <div className="button-panel">
        <style jsx>{style}</style>
        <button type="submit" className={buttonStyle} value={params.title}
                disabled={params.fetching}>{params.title}</button>
    </div>
};
