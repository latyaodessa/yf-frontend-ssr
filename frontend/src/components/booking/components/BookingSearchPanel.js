import React from 'react'
import {BookingContext} from './../../../../pages/booking';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCountries} from "../../../actions/metaActions";
import {bindActionCreators} from "redux";
import {Dropdown} from 'semantic-ui-react'
import _ from 'lodash'
import Loader from './../../core/loaders/ComponentLoader';
import translation from './../../../../res/translations/booking';

BookingSearchPanel.propTypes = {
    countries: PropTypes.object,
    getCountries: PropTypes.func.isRequired
};


function BookingSearchPanel({countries, getCountries, classes}) {

    React.useEffect(() => {
        getCountries();
    }, []);


    console.log(countries);
    if (countries.fetching) {
        return <Loader full={true}/>
    }

    return <div>
        <BookingContext.Consumer>
            {context => (<div>
                {context.test}
                <CountriesSelect countries={countries}/>

            </div>)}
        </BookingContext.Consumer>
    </div>;
}


const CountriesSelect = ({countries}) => {
    const stateOptions = _.map(countries.data, (country, index) => ({
        key: country.id,
        text: country.name,
        value: country.id,
    }));
    return <Dropdown placeholder={translation.view.panel.countries} search selection options={stateOptions}/>
};

const mapStateToProps = ({countries}) => ({countries});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getCountries
        },
        dispatch
    );


export default connect(mapStateToProps, mapDispatchToProps)(BookingSearchPanel);


