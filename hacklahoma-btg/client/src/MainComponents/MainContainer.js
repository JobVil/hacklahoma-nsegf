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
                    <MainLayout/>
                </div>
            </div>
        );
    }
}

export default Main;