import React from 'react'
import { Rating } from 'semantic-ui-react'

const HeartRating = () => (
    <div>
        <pre>Avg User Rating</pre>
        <Rating icon='heart' defaultRating={3} maxRating={5} size='mini'/>
    </div>
)

export default HeartRating