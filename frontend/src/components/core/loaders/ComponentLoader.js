import React from 'react'
import {Dimmer, Loader, Segment} from 'semantic-ui-react'

const ComponentLoader = ({full}) => (
    <div style={{
        height: '100%', width: "100%", display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: full ? 'absolute' : 'relative'
    }}>
        <Segment style={{padding: 20}} basic>
            <Dimmer active inverted>
                <Loader size={full ? 'large' : 'medium'} inverted/>
            </Dimmer>
        </Segment>
    </div>
);

export default ComponentLoader;
