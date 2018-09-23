import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import {NavLink} from 'react-router-dom'
import './NavigationItems.css';
import { Menu, Dropdown } from 'antd';
const menu = (
    <Menu className="account-dropdown">
        <Menu.Item>
            <NavLink to="/user-profile">Profile</NavLink>
        </Menu.Item>
        <Menu.Item>
            <NavLink to="/upgrade">Upgrade</NavLink>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <NavLink to="/">Log out</NavLink>
        </Menu.Item>
    </Menu>
);
const navigationItems = ( props ) => (
    <ul className="NavigationItems">
        <NavigationItem link="/user-list">
            <div className="content-navigation">
                USER LIST
            </div>
        </NavigationItem>
        <NavigationItem link="/account">
            <div className="content-navigation">
                N/A
            </div>
        </NavigationItem>
        <NavigationItem link="/account">
            <div className="content-navigation">
                N/A
            </div>
        </NavigationItem>
        <NavigationItem link="/account">
            <Dropdown overlay={menu} trigger={['click']}>
                <div style={{height:'3em'}}>
                    <div href="#" className="content-navigation-dropdown">
                        ACCOUNT
                    </div>
                </div>
            </Dropdown>
        </NavigationItem>
    </ul>
);

export default navigationItems;
