import React from 'react';
import {connect} from 'react-redux';
import VkHeaderText from '../components/header-text-component';
import FullHeaderText from '../components/full-header-text-component';
import styles from "../../../../../res/styles/single-post.scss";
import SocialSharingButtons from './buttons/SocialSharingButtons';
import LikeButton from './buttons/LikeButton';
import componentsStyle from './buttons/style.scss'
import {Container, Header} from 'semantic-ui-react'
import {PH_EVENT_DATE} from "../../../../messages/post";

class HeaderSingle extends React.Component {
    constructor(props) {
        super(props);

    }

    renderHeaderText = () => {
        if (this.props.post.vkPost) {
            return <VkHeaderText post={this.props.post}/>
        }

        return <FullHeaderText post={this.props.post}/>
    };

    renderEventDate = (eventDate) => {
        const date = new Date(eventDate * 1000);
        return <div style={inlineStyles.date}>
            <span>
            {`${PH_EVENT_DATE}: ${('0' + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`}
            </span>
        </div>
    };


    render() {
        console.log(this.props.post);
        return (
            <div>
                <style jsx>{styles}</style>
                <style jsx>{componentsStyle}</style>


                <div style={inlineStyles.headerContainer}>
                    {this.props.post.title &&
                    <Header style={inlineStyles.headerTitle} as='h3'>{this.props.post.title}</Header>}
                    {this.props.post.about &&
                    <ContainerText about={this.props.post.about}/>}
                    {this.props.post.eventDate && this.renderEventDate(this.props.post.eventDate)}
                </div>
                <div className="single-post-header">
                    {this.renderHeaderText()}
                </div>

                <div className={"button-bar"}>
                    <SocialSharingButtons/>
                    <LikeButton post={this.props.post}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

const ContainerText = ({about}) => (
    <div>
        <Container text>
            <p style={inlineStyles.text}>
                {about}
            </p>
        </Container>
    </div>
);


const inlineStyles = {
    headerContainer: {
        padding: "10px 0 0 0"
    },
    headerTitle: {
        fontSize: "2.5rem",
        textTransform: "none",
        fontFamily: "'Philosopher', sans-serif",
        textAlign: "center"
    },
    text: {
        "white-space": "pre-wrap"
    },
    date: {
        textAlign: "right",
        padding: "10px",
        color: "#616161"
    }
};
export default connect(mapStateToProps)(HeaderSingle);

