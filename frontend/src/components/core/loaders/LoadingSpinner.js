import styles from './style.scss'

const LoadingSpinner = () => (
    <div>
        <style jsx>{styles}</style>

        <div className={"loading-container"}>
            <div className="loading-button" aria-hidden="true">

            </div>
        </div>
    </div>


);

export default LoadingSpinner;
