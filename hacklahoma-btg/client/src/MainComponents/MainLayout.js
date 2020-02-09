import React, { Component } from 'react'
import FilterLayout from './GridView/FilterLayout'
import SearchExampleStandard from './SearchBar'
import ProjectCloseUp from './ProjectView/MainBody'
import { Header, Icon, Image, Menu, Segment, Sidebar, Grid, Sticky } from 'semantic-ui-react'
import IconExampleCircular from './AccountIcons'

class MainLayout extends Component {
    
    render(){
        let body;
        let bodyCenterd;
        if(false){
            body = <FilterLayout />
            bodyCenterd = 'left';
        } else {
            body = <ProjectCloseUp/>
            bodyCenterd = 'center';
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
              <Menu.Item as='a'>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
              </Sticky>
            </Sidebar>
        
            <Sidebar.Pusher>
              <Segment basic>
                <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column width={7}>
                        <SearchExampleStandard />
                    </Grid.Column>
                    <Grid.Column width={5} textAlign='right'>
                        <IconExampleCircular/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered=''  textAlign='left'>
                    {body}
                </Grid.Row>
                </Grid>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          );
    }
}

export default MainLayout
