import React from 'react'
import RatingExampleOnRate from './Star'
import { Button, Icon, Image, Item, Label, Grid} from 'semantic-ui-react'

const paragraph = <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                      ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                      magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                      Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                      dapibus.</p>

const FilterLayout = (props) => (
  <Grid stretched='true'>
    <Grid.Column  width={0}></Grid.Column>
    <Grid.Column width={10} textAlign='left'>
  <Item.Group divided>
    <Item>
      <Item.Image src = 'https://react.semantic-ui.com/images/wireframe/image.png' />

      <Item.Content onClick={()=> props.goToProject()}>
        <Item.Header as='a' textAlign='left' >Title</Item.Header>
        <Item.Meta>
          <span className='cinema'>WebDev</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Label>IMAX</Label>
          <Label icon='globe' content='Additional Languages' />
        </Item.Extra>
        <Item.Extra>
            <RatingExampleOnRate/>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src = 'https://react.semantic-ui.com/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Title</Item.Header>
        <Item.Meta>
          <span className='cinema'>Rest API</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
            <RatingExampleOnRate/>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src = 'https://react.semantic-ui.com/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Title</Item.Header>
        <Item.Meta>
          <span className='cinema'>Application</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
            <RatingExampleOnRate/>
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
  </Grid.Column>
  <Grid.Column  width={2}></Grid.Column>
  </Grid>
)

export default FilterLayout
