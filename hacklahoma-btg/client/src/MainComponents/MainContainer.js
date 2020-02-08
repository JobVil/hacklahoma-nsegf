import React, { Component } from 'react';
import Header from './Header'
import SidebarMS from './Sidebar'
import SearchExampleStandard from './SearchBar'

class Main extends Component{
    render(){
        return (
            <div className='main'>
                <div className='header'>
                    <Header/>
                    <SearchExampleStandard/>
                </div>
                <div className='side-bar'>
                    <SidebarMS/>
                </div>
            </div>
        );
    }
}

export default Main;