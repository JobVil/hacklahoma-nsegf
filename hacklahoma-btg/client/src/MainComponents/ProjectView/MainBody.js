import React, { Component } from 'react';
import ProjectComments from './ProjectComments';
import ProjectInfo from './ProjectInfo';
import { Divider } from 'semantic-ui-react';


export default class ProjectCloseUp extends Component{
    render(){
        return(
            <div>
                <ProjectInfo pagePid={this.props.pagePid}/>
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <ProjectComments pagePid={this.props.pagePid}/>
            </div>
        );
    }
}