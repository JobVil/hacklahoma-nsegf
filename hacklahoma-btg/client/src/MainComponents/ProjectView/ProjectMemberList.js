import React from 'react'
import { Label } from 'semantic-ui-react'

const MemberList = () => (
  <div>
    <Label as='a' image>
      <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      Joe
    </Label>
    <Label as='a' image>
      <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      Elliot
    </Label>
    <Label as='a' image>
      <img src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
      Stevie
    </Label>
  </div>
)

export default MemberList
