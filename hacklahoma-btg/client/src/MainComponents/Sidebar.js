import React, { Component } from 'react'
import ItemExampleDivided from './MainPage'
import SearchExampleStandard from './SearchBar'
import ProjectCloseUp from './ProjectCloseUP'
import { Header, Icon, Image, Menu, Segment, Sidebar, Grid } from 'semantic-ui-react'
import IconExampleCircular from './AccountIcons'

class SidebarMS extends Component {
    
    render(){
        let body;
        if(false){
            body = <ItemExampleDivided />
        } else {
            body = <ProjectCloseUp/>
        }
        return( 
        <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='push'
              icon='labeled'
              inverted
              vertical
              visible
              width='wide'
            >
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
            </Sidebar>
        
            <Sidebar.Pusher>
              <Segment basic>
                <Grid divided='vertically'>
                <Grid.Row columns={3}>
                    <Grid.Column floated='right'>
                        <Header as='h3'>Application Content</Header>
                    </Grid.Column>
                    <Grid.Column stretched='true'>
                        <SearchExampleStandard />
                    </Grid.Column>
                    <Grid.Column>
                        <IconExampleCircular/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered='true' stretched='true'>
                    {body}
                </Grid.Row>
                </Grid>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          );
    }
 
}

export default SidebarMS
