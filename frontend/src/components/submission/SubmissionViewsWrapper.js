import React from 'react'
import {connect} from "react-redux";
import ParticipantsView from './views/ParticipantsView'

class SubmissionViewsWrapper extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    render() {
        return (
            <div>
                <ParticipantsView/>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(SubmissionViewsWrapper);

