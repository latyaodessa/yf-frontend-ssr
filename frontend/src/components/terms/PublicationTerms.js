import React from 'react'
import {List, Header} from 'semantic-ui-react'
import {TERMS_PUB_TITLE, TERMS_RULES} from "../../messages/terms";

const PublicationTerms = () => (
    <div>
        <Header as='h2' content={TERMS_PUB_TITLE} style={style.title} textAlign='center'/>
        <List as='ul' style={style.list}>
            {TERMS_RULES.map(term => {
                return <List.Item as='li'>{term}</List.Item>;
            })}

        </List>
    </div>
);


export default PublicationTerms;


const style = {
    title: {
        marginTop: '3em',
        fontSize: '1.5em'
    },
    list: {
        padding: '30px',
        fontSize: '15px'
    }
};
