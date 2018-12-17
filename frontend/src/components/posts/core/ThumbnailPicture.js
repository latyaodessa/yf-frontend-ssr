import {Link} from '../../../../routes'
import elementsStyles from '../../../../res/styles/common/elements.scss'
import styles from '../../../../res/styles/main.scss'

const ThumbnailPicture = (props) => (
    <div>
        <style jsx>{styles}</style>
        <style jsx>{elementsStyles}</style>
        <div className="grig-img-container hovereffect">
            <img className="grig-img" src={props.post.thumbnail}/>
            <div className="overlay">

                {props.children && props.children}
                <Link route='pub' params={{link: props.post.link}}>
                    <a>
                        <div className="ul-main-list">
                            {props.post.md &&
                            <div className={"participant-preview-container"}>
                                <img src={"/static/img/icons/woman-white.png"}/>
                                <span>{props.post.md}</span>
                            </div>}

                            {props.post.ph &&
                            <div className={"participant-preview-container"}>
                                <img src={"/static/img/icons/photo-camera-white.png"}/>
                                <span>{props.post.ph}</span>
                            </div>
                            }

                            {!props.post.ph && !props.post.md && props.post.text &&
                            <div className={"participant-preview-container"}>
                                <img src={"/static/img/icons/artist-white.png"}/>
                                <span>{props.post.text.replace(/#.*s/, '').replace(/\[.*\|/, '').replace(/]/, '').replace(/http.*/, '')}</span>
                            </div>
                            }

                            <div className={"preview-like-container"}>
                                <img src={"/static/img/icons/like-white.png"}/>
                                <span>{props.post.likes}</span>
                            </div>

                        </div>
                    </a>
                </Link>

            </div>
        </div>
    </div>
);

export default ThumbnailPicture;
