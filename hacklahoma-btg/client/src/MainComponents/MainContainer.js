import React, { Component } from 'react';
import Header from './Header'
import MainLayout from './MainLayout'

class Main extends Component{
    render(){
        return (
            <div className='main'>
                <div className='header'>
                </div>
                <div className='side-bar'>
                    <MainLayout 
                        page={this.props.page} 
                        pagePid={this.props.pagePid}
                        goToProject={this.props.goToProject}
                        goHome={this.props.goHome}
                    />
                </div>
            </div>
        );
    }
}

export default Main;