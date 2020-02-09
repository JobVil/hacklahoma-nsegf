/* eslint-disable max-len */

import React, { Component } from 'react';
import { Container, Divider, Grid, GridColumn, Image, GridRow, Header } from 'semantic-ui-react';
import ProfileIcon from './OwnerProfileIcon'
import HeartRating from './HearRating'
import MemberList from './ProjectMemberList'
import RecentOverView from './ProjectRecentOV'
import FilterLaybels from './FilterLabels'

class ProjectInfo extends Component {
  constructor(props){
    super(props)
    this.state ={
      projectInfo: {}
    }
  }

  onLoad = () =>{
    fetch('/api/GET/singleReport/'+this.props.pagePid)
    .then((res) => res.json())
    .then((data) => {
      try{
        this.setState({projectInfo: data}, function() { console.log("setState completed") })
      } catch (e){
        console.log(e);
      }
      
      return data;
    })
  }

  componentDidMount(){
    this.onLoad();
  }

  render(){
    return (
      <div>
    <Grid divided>
    <Grid.Row >
      <Grid.Column width={3}>
        <Image src={process.env.PUBLIC_URL+this.state.projectInfo.logo_url} />
        <h4>Labels</h4>
        <FilterLaybels catigories={this.state.projectInfo.catigories}/>
      </Grid.Column>
      <Grid.Column floated='left' textAlign='left' width={4}>
        <h4>Owner:</h4>
          <ProfileIcon owner={this.state.projectInfo.owner}/>
          <HeartRating ownerRating={this.state.projectInfo.ownerRating}/>
        <h5>Member Size: {this.state.projectInfo.member_size}</h5>
        <MemberList members={this.state.projectInfo.members}/>
        <h5>Project Link</h5>
        <a href={this.state.projectInfo.ext_url} src={this.state.projectInfo.ext_url} target='__blank'>{this.state.projectInfo.ext_url}</a>
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
    <Header as='h2' textAlign='left' className='projectTitle'>Discription</Header>
    <Divider hidden />
      <Container textAlign='justified'>
        <Header as='h3' textAlign='center' className='projectTitle'>{this.state.projectInfo.pname}</Header>
        <Divider />
        <p>
          {this.state.projectInfo.desc}
        </p>
      </Container>
    </GridColumn>
    <GridColumn width={1}></GridColumn>
    </GridRow>
  </Grid></div>
    );
  }
  
}

export default ProjectInfo