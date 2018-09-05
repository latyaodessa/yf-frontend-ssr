import React from 'react';
import WindowSizeListener from 'react-window-size-listener'
import {
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TumblrIcon,
    TumblrShareButton,
    TwitterIcon,
    TwitterShareButton,
    VKIcon,
    VKShareButton,
} from 'react-share';

import style from './style.scss';

const mobileViewSize = 850;

export default class SocialSharingButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: false,
            expand: false
        };
    }

    renderButtons = (shareUrl, title) => {
        return <div>
            <style jsx>{style}</style>
            {typeof window !== 'undefined' &&
            <div className="Demo__container">
                <div className="Demo__some-network">
                    <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        className="Demo__some-network__share-button">
                        <FacebookIcon
                            size={32}
                            round/>
                    </FacebookShareButton>

                </div>

                <div className="Demo__some-network">
                    <VKShareButton
                        url={shareUrl}
                        windowWidth={660}
                        windowHeight={460}
                        className="Demo__some-network__share-button">
                        <VKIcon
                            size={32}
                            round/>
                    </VKShareButton>
                </div>

                <div className="Demo__some-network">
                    <TwitterShareButton
                        url={shareUrl}
                        title={title}
                        className="Demo__some-network__share-button">
                        <TwitterIcon
                            size={32}
                            round/>
                    </TwitterShareButton>

                    <div className="Demo__some-network__share-count">
                        &nbsp;
                    </div>
                </div>

                <div className="Demo__some-network">
                    <TelegramShareButton
                        url={shareUrl}
                        title={title}
                        className="Demo__some-network__share-button">
                        <TelegramIcon size={32} round/>
                    </TelegramShareButton>

                    <div className="Demo__some-network__share-count">
                        &nbsp;
                    </div>
                </div>

                <div className="Demo__some-network">
                    <TumblrShareButton
                        url={shareUrl}
                        title={title}
                        windowWidth={660}
                        windowHeight={460}
                        className="Demo__some-network__share-button">
                        <TumblrIcon
                            size={32}
                            round/>
                    </TumblrShareButton>
                </div>
            </div>
            }
        </div>
    };

    changeMobileExtandableState = () => {
        this.setState({
            expand: !this.state.expand
        });
    };

    renderExtendible = () => {
        return <div className={"mobile-expand"} onClick={this.changeMobileExtandableState.bind(this)}>
            <style jsx>{style}</style>
            <img src={"/static/img/icons/share.png"}/>
        </div>
    };

    render() {

        const shareUrl = typeof window !== 'undefined' && window.location.href;
        const title = typeof document !== 'undefined' && document.title;

        return (<div className={"left-side"}>
            <style jsx>{style}</style>


            {this.state && <div className={"social-buttons-container"}>

                <WindowSizeListener
                    onResize={(windowSize) =>
                        this.setState({mobile: windowSize.windowWidth <= mobileViewSize})}>


                    {this.state.mobile ?
                        this.renderExtendible() :
                        this.renderButtons(shareUrl, title)
                    }

                    {this.state.mobile && this.state.expand &&
                    this.renderButtons(shareUrl, title)}


                </WindowSizeListener>


            </div>
            }

        </div>)
    }


}
