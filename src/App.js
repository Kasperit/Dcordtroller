import React, { PureComponent, Component } from 'react';
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import 'antd/dist/antd.css'
import './index.css';
import ListUserContainers from './client/containers/ListUser/ListUserContainers'
import Layout from './client/containers/Layout/Layout'
class App extends Component {
  render() {
    return (
        <Layout/>
    );
  }
}

export default App;
