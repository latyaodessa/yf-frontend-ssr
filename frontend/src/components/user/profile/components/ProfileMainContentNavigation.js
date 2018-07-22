import React from 'react'
import styles from '../style.scss'
import {FOLLOWING, PUBLISHED, SAVED_SETS_PICS} from "../../../../messages/profile";
import {FOLLOWING_PAGE, PUBLISHED_PAGE, SAVED_POST_PAGE} from "./ProfileMainContent";

export const ProfileMainContentNavigation = props => (
        <div>
            <style jsx>{styles}</style>

            <div className="prof-navbar">
                <div onClick={props.switchActivePage.bind(this, SAVED_POST_PAGE)} className="block">
                    <i className={"hovicon effect-1 sub-a " + getActiveStyle(props.active, SAVED_POST_PAGE)}>
                        <img src={"/static/img/icons/gallery.png"}/>
                        <span>{SAVED_SETS_PICS}</span>
                    </i>
                </div>
                <div onClick={props.switchActivePage.bind(this, PUBLISHED_PAGE)} className="block">
                    <i className={"hovicon effect-1 sub-a " + getActiveStyle(props.active, PUBLISHED_PAGE)}>
                        <img src={"/static/img/icons/camera.png"}/>
                        <span>{PUBLISHED}</span>
                    </i>
                </div>
                <div onClick={props.switchActivePage.bind(this, FOLLOWING_PAGE)} className="block">
                    <i className={"hovicon effect-1 sub-a " + getActiveStyle(props.active, FOLLOWING_PAGE)}>
                        <img src={"/static/img/icons/memories.png"}/>
                        <span>{FOLLOWING}</span>
                    </i>
                </div>

            </div>
        </div>
    )
;

const getActiveStyle = (active, page) => {
    console.log(active);
    return active === page ? "active-color" : "";
};

const style = {
    active: {
        background: '#FFE3D8 !important'
    }
};
