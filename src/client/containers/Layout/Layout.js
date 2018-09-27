import React,{Component} from 'react'
import HeaderBar from '../../components/Navigation/Header/Header'
import FooterBar from '../../components/Navigation/Footer/footer'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import ListUserAndServerContainer from '../ListUser/ListUserAndServerContainers'
import UpdateBlocker from '../UpdateBlocker';
import ContentWeb from './Content'
import ConnectionToDiscord from '../Auth/connectionToDiscord'


class Layout extends Component{

    /*shouldComponentUpdate(nextProps){
        return this.props.location.pathname !== nextProps.location.pathname
    }*/
    render(){
        return(
            <div>
                    <div className="App">
                        <UpdateBlocker>
                            <HeaderBar
                                {...this.props}
                            />
                        </UpdateBlocker>
                        <Switch>
                            <Route key={window.location.href} path={`${this.props.match.url}/servers`} render={(props) =>  (
                                <ContentWeb
                                    {...props}
                                    title="Servers"
                                >
                                    <ListUserAndServerContainer
                                        infoFromDiscord = {this.props.infoFromDiscord}
                                        msg = {this.props.msg}
                                        {...props}
                                    />
                                </ContentWeb>
                                )}/>
                        </Switch>
                        <UpdateBlocker>
                            <FooterBar/>
                        </UpdateBlocker>
                    </div>
            </div>
        )
    }
}

export default Layout