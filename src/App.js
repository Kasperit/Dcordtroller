import React, { Component } from 'react';
import './index.css';
import HeaderBar from './client/components/Navigation/Header/Header'
import ListUserContainers from './client/containers/ListUser/ListUserContainers'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar/>
        <div className="content">
          <ListUserContainers/>
        </div>
        <div className="footer">
        </div>
      </div>
    );
  }
}

export default App;
