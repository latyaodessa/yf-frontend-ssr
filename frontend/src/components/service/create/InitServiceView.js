import React from 'react'
import {connect} from "react-redux";
import {Button, Dropdown, Grid, Card} from 'semantic-ui-react';
import {SERVICE_OPTIONS, PH} from "../../../messages/service";
import 'semantic-ui-css/semantic.min.css'


class InitServiceView extends React.Component {


    constructor(props) {
        super(props);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    render() {
        return (
            <div>
                <Grid>
                    {SERVICE_OPTIONS.map(option => <ServiceCard option={option}/>)}
                </Grid>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {single} = state;
    return single;
}

export default connect(mapStateToProps)(InitServiceView);

const ServiceCard = ({option}) => {
    console.log(option);
    return <Grid.Column mobile={16} tablet={8} computer={8}>
        <Card
            href='#card-example-link-card'
            header={option.title}
            description={option.description}
        />
    </Grid.Column>
};
