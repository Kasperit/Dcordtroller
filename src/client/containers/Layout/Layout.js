import React,{Component} from 'react'
import HeaderBar from '../../components/Navigation/Header/Header'
import FooterBar from '../../components/Navigation/Footer/footer'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import ListUserContainers from '../ListUser/ListUserContainers'
import UpdateBlocker from '../UpdateBlocker';
import ContentWeb from './Content'


class Layout extends Component{
    /*shouldComponentUpdate(nextProps){
        return this.props.location.pathname !== nextProps.location.pathname
    }*/
    render(){
        console.log(this.props)
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
                                    <ListUserContainers
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