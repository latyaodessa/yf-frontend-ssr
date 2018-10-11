import {Card, Form, Image} from 'semantic-ui-react'
import {PH_EQ_EXAMPLE, PH_EQ_LABEL, PHOTOGRAPHER} from "../../../../messages/submission";

const ParticipantsEquipmentForm = ({participants}) => {
    console.log(participants);
    return <Card.Group>
        {participants.phs.map((ph, index) => {
            return <Card fluid key={ph.number}>
                <Card.Content>
                    <Image floated='right' size='mini' src={"/static/img/icons/photo-camera-black.png"}/>
                    <Card.Header>{ph.firstName} {ph.lastName}</Card.Header>
                    <Card.Meta>{PHOTOGRAPHER}</Card.Meta>
                    <Card.Description>
                        <Form>
                            <Form.Field>
                                <label>{PH_EQ_LABEL}</label>
                                <input placeholder={PH_EQ_EXAMPLE}/>
                            </Form.Field>
                        </Form>
                    </Card.Description>
                </Card.Content>
            </Card>

        })}

    </Card.Group>

};

export default ParticipantsEquipmentForm;
