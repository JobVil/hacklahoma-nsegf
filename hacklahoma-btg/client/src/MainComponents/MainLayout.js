import React, { Component } from 'react'
import FilterLayout from './GridView/FilterLayout'
import SearchExampleStandard from './SearchBar'
import ProjectCloseUp from './ProjectView/MainBody'
import { Header, Icon, Image, Menu, Segment, Sidebar, Grid, Sticky } from 'semantic-ui-react'
import IconExampleCircular from './AccountIcons'
import SearchedTags from './GridView/SearchedList';

class MainLayout extends Component {
    constructor(props){
      super(props)
      this.state = {
        filters: [],
      }

      this.addFilter = this.addFilter.bind(this);
      this.removeFilter = this.removeFilter.bind(this);
      this.clearFilter = this.clearFilter.bind(this);
    }

    addFilter(filter) {
      var joined = this.state.filters.concat(filter);
      this.setState({
        filters: joined
      })
    }

    removeFilter(badFilter) {
      this.setState({filters: this.state.filters.filter(function(filter) { 
        return filter !== badFilter
      })});
    }

    clearFilter(filter) {
      this.setState({
        filters: []
      })
    }

    render(){
        let body;
        let preBodySpacing;
        let bodySpacing;
        if(this.props.page == "Home"){
            body = <FilterLayout goToProject={this.props.goToProject} filters={this.props.filters}/>
            preBodySpacing = 0;
            bodySpacing = 15;
        } else {
            body = <ProjectCloseUp/>
            preBodySpacing = 2;
            bodySpacing = 13;
        }
        return( 
        <Sidebar.Pushable as={Segment} transform='none'>
            <Sidebar
              as={Menu}
              animation='push'
              icon='labeled'
              inverted
              vertical
              visible
              width='thin'
            >
            <Sticky>
              <Menu.Item as='a' onClick={() => this.props.goHome()}>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='user circle outline' />
                My Profile
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='handshake' />
                My Projects
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='warehouse' />
                My Contacts
              </Menu.Item>
              </Sticky>
            </Sidebar>
        
            <Sidebar.Pusher>
              <Segment basic>
                <Grid divided='vertically'>
                <Grid.Row columns={2}>
                <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={7}>
                        <SearchExampleStandard addFilter={this.addFilter}/>
                        <SearchedTags removeFilter={this.removeFilter} filters={this.state.filters}/>
                    </Grid.Column>
                    <Grid.Column width={5} textAlign='right'>
                        <IconExampleCircular/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered=''  textAlign=''>
                <Grid.Column width={preBodySpacing}></Grid.Column>
                <Grid.Column width={bodySpacing}>
                    {body}
                  </Grid.Column>
                </Grid.Row>
                </Grid>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          );
    }
}

export default MainLayout
