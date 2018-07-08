import style from './style.scss'

export const LimitedLabel = (params) => {
    return <div className="form-item">
        <style jsx>{style}</style>
        <h3 className={"label"}>{params.label}</h3>
    </div>
};


