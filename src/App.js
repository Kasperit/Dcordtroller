import React, { PureComponent, Component } from 'react';
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import 'antd/dist/antd.css'
import './index.css';
import Layout from './client/containers/Layout/Layout'
import Login from './client/containers/Auth/login'
class App extends Component {
  render() {
    return (
        <Layout/>
        //<Login/>
    );
  }
}

export default App;
