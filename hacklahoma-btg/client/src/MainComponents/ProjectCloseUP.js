import React, { Component } from 'react';
import CommentExampleComment from './ProjectComments';
import ContainerExampleAlignment from './ProjectBody';

export default class ProjectCloseUp extends Component{
    render(){
        return(
            <div>
                <ContainerExampleAlignment/>
                <CommentExampleComment />
            </div>
        );
    }
}