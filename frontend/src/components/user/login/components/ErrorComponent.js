import style from './success.scss'

export const ErrorComponent = (params) => {
    return <div>
        <style jsx>{style}</style>
        <div className='error'>
            <img src={"/static/img/icons/cross.png"}/>
        </div>
        <h2 className="label-success">{params.label}</h2>
    </div>

};
