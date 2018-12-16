import React from 'react'
import {connect} from 'react-redux'
import {getAllUserSubmissions} from "../../../../../actions/submission/submissionActions";
import {Header, Icon, Menu, Table, Button} from 'semantic-ui-react'
import {
    STATUS_ACCEPTED,
    STATUS_BLOCKED,
    STATUS_DECLINED,
    STATUS_INCOMPLETED,
    STATUS_SEND_TO_REWORK,
    STATUS_SUBMITTED,
    TABLE_COMMENT,
    TABLE_DATE,
    TABLE_STATUS,
    TABLE_TITLE,
    PUBLICATION_SHARE
} from "../../../../../messages/submission";
import {Link} from '../../../../../../routes'

const SUBMITTED = "SUBMITTED";
const INCOMPLETED = "INCOMPLETED";
const SEND_TO_REWORK = "SEND_TO_REWORK";
const ACCEPTED = "ACCEPTED";
const DECLINED = "DECLINED";
const BLOCKED = "BLOCKED";

class SubmittedPublicationsList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            limit: 5
        }
    }

    componentDidMount() {
        this.requestSubmissionsList(this.state.offset);
    }

    navigateTo = (isForward) => {
        console.log(this.state);
        if (isForward) {
            const offset = this.state.offset + this.state.limit;
            this.setState({offset})
            this.requestSubmissionsList(offset);
        }

        if (!isForward && (this.state.offset - this.state.limit) >= 0) {
            const offset = this.state.offset - this.state.limit;
            this.setState({offset})
            this.requestSubmissionsList(offset);
        }

    };

    requestSubmissionsList = (offset) => {
        this.props.dispatch(getAllUserSubmissions(offset, this.state.limit));
    };


    render() {
        return (
            <div>
                {this.props.data &&
                <div style={style.container}>
                    <div style={style.header}>
                        <Header as='h4'>{TABLE_TITLE}</Header>
                        <Link route={"submission"}>
                            <Button style={style.button} icon labelPosition='right' primary>
                                {PUBLICATION_SHARE}
                                <Icon name='photo'/>
                            </Button>
                        </Link>
                    </div>
                    <TableExamplePositiveNegative data={this.props.data}/>
                    <NavigatonBar navigateTo={this.navigateTo}/>
                </div>
                }
            </div>
        )
    }
}

const readableState = (sbmState) => {
    if (sbmState === SUBMITTED) {
        return <Table.Cell><Icon name='send'/> {STATUS_SUBMITTED}</Table.Cell>
    }
    if (sbmState === INCOMPLETED) {
        return <Table.Cell warning><Icon name='warning'/> {STATUS_INCOMPLETED}</Table.Cell>
    }
    if (sbmState === SEND_TO_REWORK) {
        return <Table.Cell warning><Icon name='warning'/> {STATUS_SEND_TO_REWORK}</Table.Cell>
    }
    if (sbmState === ACCEPTED) {
        return <Table.Cell positive><Icon name='check'/> {STATUS_ACCEPTED}</Table.Cell>
    }
    if (sbmState === DECLINED) {
        return <Table.Cell negative><Icon name='close'/> {STATUS_DECLINED}</Table.Cell>
    }
    if (sbmState === BLOCKED) {
        return <Table.Cell negative><Icon name='close'/> {STATUS_BLOCKED}</Table.Cell>
    }
};

const NavigatonBar = ({navigateTo}) => {
    return <Menu pagination>
        <Menu.Item onClick={navigateTo.bind(this, false)} as='a' icon>
            <Icon name='chevron left'/>
        </Menu.Item>
        <Menu.Item onClick={navigateTo.bind(this, true)} as='a' icon>
            <Icon name='chevron right'/>
        </Menu.Item>
    </Menu>
};


const TableExamplePositiveNegative = ({data}) => (
    <Table celled>
        {console.log(data)}
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>{TABLE_DATE}</Table.HeaderCell>
                <Table.HeaderCell>{TABLE_STATUS}</Table.HeaderCell>
                <Table.HeaderCell>{TABLE_COMMENT}</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {data.map(sbmt => {
                const date = new Date(sbmt.createdOn);
                const readableDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
                return <Link key={sbmt.id} to={"/submission?uuid=" + sbmt.uuid}>
                    <Table.Row style={style.row}>
                        <Table.Cell>{readableDate}</Table.Cell>
                        {readableState(sbmt.status)}
                        <Table.Cell>{sbmt.comment}</Table.Cell>
                    </Table.Row>
                </Link>
            })}
        </Table.Body>
    </Table>
);

const style = {
    row: {
        cursor: "pointer"
    },
    container: {
        padding: "20px 0 20px 0",
        textAlign: "left"
    },
    button: {
        background: "#3b9c9a"
    },
    header: {
        display: "flex",
        justifyContent: "space-between"
    }
};


function mapStateToProps(state) {
    const {submissionsList} = state;
    return submissionsList;
}

export default connect(mapStateToProps)(SubmittedPublicationsList);
