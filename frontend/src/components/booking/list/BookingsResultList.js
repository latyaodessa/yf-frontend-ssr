import React from 'react'
import {BookingContext} from './../../../../pages/booking';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCountries} from "../../../actions/metaActions";
import {bindActionCreators} from "redux";
import {Card, Grid, Icon, Image} from 'semantic-ui-react'

BookingResultList.propTypes = {
    countries: PropTypes.object,
    getCountries: PropTypes.func.isRequired
};


function BookingResultList({countries, getCountries, classes}) {

    // if (countries.fetching) {
    //     return <Loader full={true}/>
    // }

    return <div>
        <BookingContext.Consumer>
            {context => (<div>
                {/*{context.test}*/}
                <GridList/>

            </div>)}
        </BookingContext.Consumer>
    </div>;
}


const GridList = () => {
    return <Grid container columns={3} divided>
        {Array(200).fill(0).map(() => {
            // console.log(a);
            return <Grid.Column mobile={8} tablet={5} computer={4}>
                <InfoCard/>
            </Grid.Column>
        })
        }


    </Grid>
};


const InfoCard = () => (
    <Card>
        <Image src='https://sun6-2.userapi.com/c849528/v849528914/1c4a8c/7PnnUCiSRMc.jpg' wrapped ui={false}/>
        <Card.Content>
            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'/>
            <Card.Header>TFP</Card.Header>
            <Card.Meta>New User</Card.Meta>
            <Card.Description>Jenny requested permission to view your contact details</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Icon style={{cursor: 'initial'}} color='blue' name='star'/>
                    <Icon style={{cursor: 'initial'}} color='blue' name='star'/>
                    <Icon style={{cursor: 'initial'}} color='blue' name='star'/>
                    <Icon style={{cursor: 'initial'}} color='blue' name='star'/>
                    <Icon style={{cursor: 'initial'}} color='blue' name='star outline'/>
                </div>
                <div style={{display: 'flex'}}>
                    <div>
                        Проверен
                    </div>
                    <Icon style={{margin: '4px 0 0 4px'}} color={'green'} name="check circle outline"/>
                </div>
            </div>
        </Card.Content>
    </Card>
);

const mapStateToProps = ({countries}) => ({countries});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getCountries
        },
        dispatch
    );


export default connect(mapStateToProps, mapDispatchToProps)(BookingResultList);


