import React from 'react'
import styles from "../../../../../res/styles/single-post.scss"
import elementsStyle from "../../../../../res/styles/common/elements.scss"
import {Accordion, Grid, Header, Icon, List} from 'semantic-ui-react'
import {HAIR_STYLIST, MODEL, MUA, PHOTOGRAPHER, SET_DESIGNER, WARDROBE_STYLIST} from "../../../../messages/submission";

const PARTICILANT_TYPES = {
    PH: {
        type: 'PH',
        image: "/static/img/icons/photo-camera-black.png",
        title: PHOTOGRAPHER
    },
    MD: {
        type: 'MD',
        image: "/static/img/icons/woman-black.png",
        title: MODEL
    },
    MUA: {
        type: 'MUA',
        image: "/static/img/icons/mascara.png",
        title: MUA
    },
    HAIR_STAILIST: {
        type: 'HAIR_STAILIST',
        image: "/static/img/icons/salon.png",
        title: HAIR_STYLIST
    },
    WARDROBE_STYLIST: {
        type: 'WARDROBE_STYLIST',
        image: "/static/img/icons/hanger.png",
        title: WARDROBE_STYLIST
    },
    SET_DESIGNER: {
        type: 'SET_DESIGNER',
        image: "/static/img/icons/hands-framing.png",
        title: SET_DESIGNER
    }
};

export default class FullHeaderText extends React.Component {

    constructor(props) {
        super(props);

    }

    state = {activeIndex: null}

    handleClick = (e, titleProps) => {
        const {index} = titleProps
        const {activeIndex} = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({activeIndex: newIndex})
    };

    regexCleaner(text) {
        return text && text.replace(/#.*s/, '').replace(/\[.*\|/, '').replace(/]/, '').replace(/http.*/, '');
    }

    getType = (type) => {
        switch (type) {
            case "MD":
                return PARTICILANT_TYPES.MD;
            case "PH":
                return PARTICILANT_TYPES.PH;
            case "MUA":
                return PARTICILANT_TYPES.MUA;
            case "HAIR_STAILIST":
                return PARTICILANT_TYPES.HAIR_STAILIST;
            case "WARDROBE_STYLIST":
                return PARTICILANT_TYPES.WARDROBE_STYLIST;
            case "SET_DESIGNER":
                return PARTICILANT_TYPES.SET_DESIGNER;

        }
    };

    getParticipantText = (pt) => {
        return <div>
            <style jsx>{styles}</style>
            <style jsx>{elementsStyle}</style>
            <div className={"pt-container-with-header"}>
                <div className={"participant-container"}>
                    <img src={this.getType(pt.type).image}/>
                    <span>{pt.firstName + " " + pt.lastName}</span>
                    <Icon style={inlineStyle.icon} name='dropdown'/>
                </div>
                <Header style={inlineStyle.location} as='h4'>
                    <Header.Subheader>{pt.country}, {pt.city}</Header.Subheader>
                </Header>
            </div>

        </div>
    };

    getParticipantContentData = (pt) => {
        return <div style={inlineStyle.activeContent}>
            <List divided verticalAlign='middle'>
                {pt.instagram &&
                <List.Item as='a' target="_blank" href={`https://instagram.com/${pt.instagram}`}>
                    <Icon name='instagram'/>
                    <List.Content>
                        <List.Header as='a'>@{pt.instagram}</List.Header>
                    </List.Content>
                </List.Item>}
                {pt.facebook &&
                <List.Item as='a' target="_blank" href={`https://facebook.com/${pt.facebook}`}>
                    <Icon name='facebook'/>
                    <List.Content>
                        <List.Header as='a'>@{pt.facebook}</List.Header>
                    </List.Content>
                </List.Item>}
                {pt.vk &&
                <List.Item as='a' target="_blank" href={`https://vk.com/${pt.vk}`}>
                    <Icon name='vk'/>
                    <List.Content>
                        <List.Header as='a'>@{pt.vk}</List.Header>
                    </List.Content>
                </List.Item>}
                {pt.website &&
                <List.Item as='a' target="_blank" href={pt.website}>
                    <Icon name='world'/>
                    <List.Content>
                        <List.Header as='a'>{pt.website}</List.Header>
                    </List.Content>
                </List.Item>}
                {pt.agency && <List.Item as='a'>
                    <Icon name='address card'/>
                    <List.Content>
                        <List.Header as='p'>{pt.agency}</List.Header>
                    </List.Content>
                </List.Item>}
            </List>
        </div>
    };


    renderAccordion = () => {
        const {activeIndex} = this.state;
        return <Grid stackable columns={2}>
            {this.props.post.publicationParticipants.map((participant, order) => {
                return <Grid.Column><Accordion>
                    <Accordion.Title active={activeIndex === order} index={order} onClick={this.handleClick}>
                        {this.getParticipantText(participant)}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === order}>
                        {this.getParticipantContentData(participant)}
                    </Accordion.Content>
                </Accordion></Grid.Column>
            })}</Grid>
    };

    render() {
        return (

            <div className="top-text">
                <style jsx>{styles}</style>
                <style jsx>{elementsStyle}</style>
                {this.renderAccordion()}
            </div>
        )
    }
}

const inlineStyle = {
    icon: {
        fontSize: "1.2rem",
        verticalAlign: "middle"
    },
    location: {
        padding: "0 0 0 50px",
        margin: 0
    },
    activeContent: {
        padding: "5px 0 0 0"
    }
};


