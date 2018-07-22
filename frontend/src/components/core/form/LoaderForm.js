import style from './../../../../res/styles/form-loader.scss'

const LoaderForm = (props) => (
    <div>
        <style jsx>{style}</style>
        <div style={{height: props.height + 'px'}}>
            <div className={"animated-background"}/>
        </div>
    </div>

);
export default LoaderForm;

