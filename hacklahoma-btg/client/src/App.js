import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Main from './MainComponents/MainContainer'
import ItemExampleDivided from './MainComponents/MainPage'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: "Home",
      pagePid: ""
    }

    this.goToProject = this.goToProject.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  goToProject(pid){
    this.setState({
      page: "project",
      pagePid: pid
    })
  }

  goHome(){
    this.setState({
      page: "Home"
    })
  }

  render(){
    return (
      <div className="App">
        <Main 
        page={this.state.page} 
        pagePid={this.state.pagePid}
        goToProject={this.goToProject}
        goHome={this.goHome}
        />
      </div>
      );
  }
}

export default App;
