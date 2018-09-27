import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css';

const navigationItems = ( props ) => {
    /*const menu = (
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
    );*/
    return (
        <ul className="NavigationItems">
            <NavigationItem link={`${props.match.url}/servers`}>
                <div className="content-navigation">
                    SERVERS
                </div>
            </NavigationItem>
            <NavigationItem link={`${props.match.url}/bot`}>
                <div className="content-navigation">
                    BOT
                </div>
            </NavigationItem>
            <NavigationItem link={`${props.match.url}/soundboard`}>
                <div className="content-navigation">
                    SOUNDBOARD
                </div>
            </NavigationItem>
            <NavigationItem link="/">
                <div className="content-navigation">
                    LOG OUT
                </div>
            </NavigationItem>
        </ul>
    );
}

export default navigationItems;
