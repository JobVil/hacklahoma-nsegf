import React, { Component } from 'react';
import ProjectComments from './ProjectComments';
import ProjectInfo from './ProjectInfo';

export default class ProjectCloseUp extends Component{
    render(){
        return(
            <div>
                <ProjectInfo/>
                <ProjectComments />
            </div>
        );
    }
}