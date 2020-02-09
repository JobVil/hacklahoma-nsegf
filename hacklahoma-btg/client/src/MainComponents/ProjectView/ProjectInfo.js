/* eslint-disable max-len */

import React from 'react';
import { Container, Divider, Grid, GridColumn, Image, GridRow, Header } from 'semantic-ui-react';
import ProfileIcon from './OwnerProfileIcon'
import HeartRating from './HearRating'
import MemberList from './ProjectMemberList'
import RecentOverView from './ProjectRecentOV'
import FilterLaybels from './FilterLabels'

const ProjectInfo = () => (
  <div>
    <Grid divided>
    <Grid.Row >
      <Grid.Column width={3}>
        <Image src={process.env.PUBLIC_URL + '/images/image.png'} />
        <h4>Labels</h4>
        <FilterLaybels/>
      </Grid.Column>
      <Grid.Column floated='left' textAlign='left' width={4}>
        <h4>Owner:</h4>
          <ProfileIcon/>
          <HeartRating/>
        <h5>Member Size: #</h5>
        <MemberList/>
        <h5>Project Link</h5>
        <a href='https://github.com/' src='https://github.com/' target='__blank'>https://github.com/</a>
      </Grid.Column>
      <Grid.Column floated='left' textAlign='left' width={8}>
        <RecentOverView/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  <Grid>
    <GridRow>
    <GridColumn width={1}></GridColumn>
    <GridColumn width={10}>
      <Container textAlign='justified'>
        <Header as='h3' textAlign='center' className='projectTitle'>This Is A Demo title</Header>
        <Divider />
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
          ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
          quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
          tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
          enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
          imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
          ultricies nisi.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
          ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
          quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
          tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
          enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
          imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
          ultricies nisi.
        </p>
      </Container>
    </GridColumn>
    <GridColumn width={1}></GridColumn>
    </GridRow>
  </Grid></div>
)

export default ProjectInfo