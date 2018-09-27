import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import {NavLink,Link} from 'react-router-dom'
import './NavigationItems.css';
import { Menu, Dropdown } from 'antd';

const navigationItems = ( props ) => {
    const menu = (
        <Menu className="account-dropdown">
            <Menu.Item>
                <NavLink to={`${props.match.url}/user-profile`}>Profile</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to={`${props.match.url}/upgrade`}>Upgrade</NavLink>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item>
                <NavLink to="/">Log out</NavLink>
            </Menu.Item>
        </Menu>
    );
    return (
        <ul className="NavigationItems">
            <NavigationItem link={`${props.match.url}/servers`}>
                <div className="content-navigation">
                    SERVERS
                </div>
            </NavigationItem>
            <NavigationItem link={`${props.match.url}/account`}>
                <div className="content-navigation">
                    N/A
                </div>
            </NavigationItem>
            <NavigationItem link={`${props.match.url}/account`}>
                <div className="content-navigation">
                    N/A
                </div>
            </NavigationItem>
            <NavigationItem link={`${props.match.url}/account`}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <div style={{height: '3em'}}>
                        <div href="#" className="content-navigation-dropdown">
                            ACCOUNT
                        </div>
                    </div>
                </Dropdown>
            </NavigationItem>
        </ul>
    );
}

export default navigationItems;
