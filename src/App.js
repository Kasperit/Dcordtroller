import React, { Component } from 'react';
import './index.css';
import HeaderBar from './client/components/Navigation/Header/Header'
import ListUserContainers from './client/containers/ListUser/ListUserContainers'
import FooterBar from './client/components/Navigation/Footer/footer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <HeaderBar/>
          <div className="content">
              <ListUserContainers/>
          </div>
          <FooterBar/>
      </div>
    );
  }
}

export default App;
