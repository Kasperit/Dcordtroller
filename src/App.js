import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import 'antd/dist/antd.css'
import './index.css';
import ListUserContainers from './client/containers/ListUser/ListUserContainers'
import Layout from './client/containers/Layout/Layout'
class App extends Component {
  render() {
    return (
        <Layout>
            <Switch>
            <Route path="/user-list" exact component={ListUserContainers}/>
            </Switch>
        </Layout>
    );
  }
}

export default App;
