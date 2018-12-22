import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'semantic-ui-react';
import {getSubmissionList} from "../../../actions/SubmissionActions";
import {push} from "connected-react-router";
import {bindActionCreators} from "redux";

class SubmissonListTable extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props);
    }


    componentDidMount() {
        this.props.getSubmissionList("SUBMITTED");
    }

    renderTable = () => {
        return <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Submission Date</Table.HeaderCell>
                    <Table.HeaderCell>Location</Table.HeaderCell>
                    <Table.HeaderCell>Event Date</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {this.props.data && this.props.data.map(sbmt => {
                    const date = new Date(sbmt.createdOn);
                    const readableDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);

                    const eventDate = new Date(sbmt.eventDate);
                    const readableeventDate = eventDate.getDate() + "/" + eventDate.getMonth() + "/" + eventDate.getFullYear() + " " + eventDate.getHours() + ':' + ('0' + eventDate.getMinutes()).slice(-2);

                    return <Table.Row key={sbmt.id} onClick={this.props.goToDetails.bind(this, sbmt.user.id, sbmt.uuid)}>
                        <Table.Cell>{readableDate}</Table.Cell>
                        <Table.Cell>{`${sbmt.country}, ${sbmt.city}`}</Table.Cell>
                        <Table.Cell>{readableeventDate}</Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
    };

    render() {
        return (<div>
            {this.renderTable()}
        </div>)
    }

}

const mapStateToProps = ({submissionList}) => (
    submissionList
);

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getSubmissionList,
            goToDetails: (userId, uuid) => push(`/submission/${userId}/${uuid}`)
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmissonListTable)
