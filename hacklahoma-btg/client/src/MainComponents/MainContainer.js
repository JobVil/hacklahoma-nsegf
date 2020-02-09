import React, { Component } from 'react';
import Header from './Header'
import MainLayout from './MainLayout'

class Main extends Component{
    render(){
        return (
            <div className='main'>
                <div className='header'>
                {this.props.page}
                </div>
                <div className='side-bar'>
                    <MainLayout 
                        page={this.props.page} 
                        goToProject={this.props.goToProject}
                        goHome={this.props.goHome}
                    />
                </div>
            </div>
        );
    }
}

export default Main;