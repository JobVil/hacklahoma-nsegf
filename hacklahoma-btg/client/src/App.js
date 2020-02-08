import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Main from './MainComponents/MainContainer'
import ItemExampleDivided from './MainComponents/MainPage'

class App extends Component {

  constructor() {
    super();
  }

  state = {

  }
  render(){
    return (
      <div className="App">
        <Main />
      </div>
      );
  }
}

export default App;
