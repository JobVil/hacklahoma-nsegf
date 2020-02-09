import React from 'react'
import { Label } from 'semantic-ui-react'

const ProfileIcon = (props) => {
  const imageProps = {
    avatar: true,
    spaced: 'right',
    src: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
  }

  return <Label as='a' content='Elliot' image={imageProps} />
}

export default ProfileIcon