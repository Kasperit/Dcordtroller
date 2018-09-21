import React,{Component} from 'react'
import HeaderBar from '../../components/Navigation/Header/Header'
import FooterBar from '../../components/Navigation/Footer/footer'
import {BrowserRouter} from 'react-router-dom'

class Layout extends Component{
    render(){
        return(
            <div>
                <BrowserRouter>
                    <div className="App">
                        <HeaderBar/>
                            <div className="content">
                                {this.props.children}
                            </div>
                        <FooterBar/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default Layout