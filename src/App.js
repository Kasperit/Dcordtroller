import React, { PureComponent, Component, Fragment } from 'react';
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import 'antd/dist/antd.css'
import './index.css';
import Layout from './client/containers/Layout/Layout'
import ConnectionToDiscord from './client/containers/Auth/connectionToDiscord'
//import Login from './client/containers/Auth/login'
//import Register from './client/containers/Auth/register'
//import Router from 'react-router-dom/Router';
//import Routes from './client/containers/Auth/routes'
class App extends Component {
  render() {
    return (
        <Fragment>
            <ConnectionToDiscord/>
        </Fragment>
        /*<BrowserRouter>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} /> 
          </div>
        </BrowserRouter>
        //<Login/>
        //<Register/>
        //<Routes/>*/
    );
  }
}

export default App;
