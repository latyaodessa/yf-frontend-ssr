import React from 'react'
import {Form, Grid, Segment} from 'semantic-ui-react'

class SubmissionParticipantsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allParticipants: props.allParticipants
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    commit = () => {
        return this.state.allParticipants;
    };


    updateNestedField = (e, key, oder) => {

        let prtArray = this.state.allParticipants[key];

        prtArray[oder][e.target.name] = e.target.value;

        this.setState({allParticipants: {...this.state.allParticipants, [key]: prtArray}});

    };

    participantsRender = () => {
        let table = [];
        for (let [key, value] of Object.entries(this.state.allParticipants)) {
            if (value !== undefined && value.length !== 0) {
                table.push(this.renderForm(key, value));

            }
        }
        return table;
    };

    renderForm = (key, value) => {
        return <div>
            <h2>{key}</h2>

            <Grid stackable columns={2}>
                {
                    value.map((p, o) => {
                        return <Grid.Column>
                            <Segment>
                                <h3>{o + 1}</h3>
                                <Form key={o}>
                                    <Form.Field>
                                        <label>agency</label>
                                        <input onChange={e => this.updateNestedField(e, key, o)} name={`agency`}
                                               value={p.agency}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>city</label>
                                        <input onChange={e => this.updateNestedField(e, key, o)} name={`city`}
                                               value={p.city}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>country</label>
                                        <input onChange={e => this.updateNestedField(e, key, o)} name={`country`}
                                               value={p.country}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>facebook</label>
                                        <input onChange={e => this.updateNestedField(e, key, o)} name={`facebook`}
                                               value={p.facebook}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>firstName</label>
                                        <input onChange={e => this.updateNestedField(e, key, o)} name={`firstName`}
                                               value={p.firstName}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>lastName</label>
                                        <input onChange={e => this.updateNestedField(e, key, o)} name={`lastName`}
                                               value={p.lastName}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>instagram</label>
                                        <input onChange={e => this.updateNestedField(e, key, o)} name={`instagram`}
                                               value={p.instagram}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>vk</label>
                                        <input onChange={e => this.updateNestedField(e, key, o)} name={`vk`}
                                               value={p.vk}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>website</label>
                                        <input onChange={e => this.updateNestedField(e, key, o)} name={`website`}
                                               value={p.website}/>
                                    </Form.Field>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    })
                }
            </Grid>
        </div>
    }


    render() {
        return (<div>
            {this.participantsRender()}
        </div>)
    }

}

export default SubmissionParticipantsForm
