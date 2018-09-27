import React,{Fragment} from "react";
import NavigationItems from './NavigationItems/NavigationItems'
import {NavLink} from 'react-router-dom'
import './Header.css'

const headerBar = (props) => {
    return (
        <div className={'header'}>
            <div className='logo'>
                <NavLink to="/main">
                    <h2>Dcordtroller</h2>
                </NavLink>
            </div>
            <NavigationItems
                {...props}
            />
        </div>
    )
};


export default headerBar;
