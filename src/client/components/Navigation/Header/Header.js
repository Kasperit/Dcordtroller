import React,{Fragment} from "react";
import NavigationItems from './NavigationItems/NavigationItems'
import {NavLink} from 'react-router-dom'
import './Header.css'

const headerBar = (props) => {
    return (
        <div className={'header'}>
            <div className='logo'>
                <NavLink to="/">
                    <h2>Dcordtroller</h2>
                </NavLink>
            </div>
            <NavigationItems/>
        </div>
    )
};


export default headerBar;
