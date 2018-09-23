import React,{Component} from 'react'
import HeaderBar from '../../components/Navigation/Header/Header'
import FooterBar from '../../components/Navigation/Footer/footer'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import ListUserAndServerContainer from '../ListUser/ListUserAndServerContainers'
import UpdateBlocker from '../UpdateBlocker';
import ContentWeb from './Content'


class Layout extends Component{
    /*shouldComponentUpdate(nextProps){
        return this.props.location.pathname !== nextProps.location.pathname
    }*/
    render(){
        return(
            <div>
                <BrowserRouter>
                    <div className="App">
                        <UpdateBlocker>
                            <HeaderBar/>
                        </UpdateBlocker>
                        <Switch>
                            <Route key={window.location.href} path="/user-list" render={(props) =>  (
                                <ContentWeb
                                    {...props}
                                >
                                    <ListUserAndServerContainer
                                        {...props}
                                    />
                                </ContentWeb>
                                )}/>
                        </Switch>
                        <UpdateBlocker>
                            <FooterBar/>
                        </UpdateBlocker>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default Layout