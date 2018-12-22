import React from 'react'
import {connect} from 'react-redux'

class SubmissionDetailsForm extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props);
    }


    componentDidMount() {

    }


    render() {
        return (<div>
            hello
        </div>)
    }

}

const mapStateToProps = ({submissionList}) => (
    submissionList
);

export default connect(
    mapStateToProps
)(SubmissionDetailsForm)
