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
    }

    this.goToProject = this.goToProject.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  goToProject(){
    this.setState({
      page: "project"
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
        goToProject={this.goToProject}
        goHome={this.goHome}
        />
      </div>
      );
  }
}

export default App;
