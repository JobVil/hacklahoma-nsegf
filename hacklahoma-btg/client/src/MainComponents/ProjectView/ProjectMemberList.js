import React from 'react'
import { Label } from 'semantic-ui-react'

const MemberList = (props) => {
  if(props.members){
    return (
      <div>
          {props.members.map(member => 
          <Label as='a' image>
            <img src={'https://react.semantic-ui.com/images/avatar/small/'+member+'.jpg'} />
              {member}
          </Label>)}
      </div>
    )
  }else {
    return <div></div>
  }
 }

export default MemberList
