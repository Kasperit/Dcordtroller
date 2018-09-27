import React, { PureComponent, Component, Fragment } from 'react';
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import 'antd/dist/antd.css'
import './index.css';
import ConnectionToDiscord from './client/containers/Auth/connectionToDiscord'
import Login from './client/containers/Auth/login'
import Register from './client/containers/Auth/register'

class App extends Component {
  render() {
    return (
        /*<Fragment>
            <ConnectionToDiscord/>
        </Fragment>*/
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/main" component={ConnectionToDiscord} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
