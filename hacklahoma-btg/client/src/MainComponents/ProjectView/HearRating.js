import React from 'react'
import { Rating } from 'semantic-ui-react'

const HeartRating = (props) => (
    <div>
        <pre>User Rating</pre>
        <Rating icon='heart' rating={props.ownerRating} maxRating={5} size='mini'/>
    </div>
)

export default HeartRating