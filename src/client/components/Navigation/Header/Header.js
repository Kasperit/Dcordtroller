import React, { Fragment } from "react";
import NavigationItems from './NavigationItems/NavigationItems'
import { NavLink } from 'react-router-dom'
import './Header.css'

const headerBar = (props) => {
    return (
        <div className={'header'}>
            <div className='logo'>
                <NavLink to="/main">
                    <h1>Dcordtroller</h1>
                </NavLink>
            </div>
            <div className="nav-bar-container">
                <NavigationItems {...props} />
            </div>
        </div>
    )
};


export default headerBar;
