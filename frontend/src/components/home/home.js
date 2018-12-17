import React from 'react';
import Grid from '../home/components/grid-pictures'
import PropTypes from 'prop-types';
import {connect} from "react-redux";

export class Home extends React.Component {

    constructor(props) {
        super(props);

        // window.scrollTo(0, 0);
        // document.title = "Young Folks - Модели и фотографы со всего мира";
    }

    static initialAction() {
        return [].concat(Grid.initialAction());
    }

    render() {
        return (
            <div className="child-container">
                <Grid init={this.props.init}/>
            </div>
        )
    }
}

Home.propTypes = {
    name: PropTypes.string
};

const mapStateToProps = state => ({
    init: state
});

export default connect(mapStateToProps)(Home);


