import React,{Fragment} from 'react'
import {List,Button,Divider,Modal,Popover,Icon} from 'antd'
import './ListUser.css'
import SingleUserInfo from './SingleUserInfo'


const ListUserActive = (props) => {
    const confirm = Modal.confirm;

    const showConfirm = (item, server , method) => {
        confirm({
            title: method === "kick" ? `Do you want to kick ${item}?` : `Do you want to ban ${item}`,
            content: 'You can add back later',
            onOk() {
                method === "kick" ? props.handleKickUser(item, server) : props.handleBanUser(item,server)
            },
            onCancel() {
            },
        });
    };

    const {listOfGuilds, server} = props;
    let listOfMembersInServer = [];
    let listOfAdminsInServer = [];
    if (server) {
        for (let i = 0; i < listOfGuilds.length; i++) {
            if (listOfGuilds[i].server === server) {
                for (let x = 0; x < listOfGuilds[i].usersActive.length; x++) {
                    if (listOfGuilds[i].serverAdmins.includes(listOfGuilds[i].usersActive[x])) 
                        listOfAdminsInServer.push(listOfGuilds[i].usersActive[x]);
                    else 
                        listOfMembersInServer.push(listOfGuilds[i].usersActive[x]);
                }
            }
        }
        return (
            <Fragment>
                <h3 style={{textAlign:'center'}}>Admins</h3>
                <List
                    locale = {{emptyText: "No user in this server"}}
                    bordered
                    dataSource={listOfAdminsInServer}
                    renderItem={item => (
                        <List.Item
                            actions={
                                [
                                    <img className="admin-symbol"src="https://www.freeiconspng.com/uploads/crown-icon-28.png" width="10%" height="10%" align="right"/>
                                ]
                            }
                        >
                            {item.tag} &nbsp;
                            <Popover content={<SingleUserInfo info={item} admin={true}/>}
                                     title="User Info"
                                     trigger="click"
                            >
                                <div className="user-info-btn">
                                    <Icon type="info-circle" theme="outlined" />
                                </div>
                            </Popover>
                        </List.Item>
                    )}
                />
                <Divider/>
                <h3 style={{textAlign:'center'}}>Users</h3>
                <List
                locale = {{emptyText: "No user in this server"}}
                bordered
                dataSource={listOfMembersInServer}
                renderItem={item => (
                    <List.Item
                        actions={
                            [
                                <Button onClick={() => showConfirm(item.tag, server, "kick")}>Kick</Button>,
                                <Button onClick={() => showConfirm(item.tag, server)}>Ban</Button>
                            ]
                        }
                    >
                        {item.tag} &nbsp;
                        <Popover content={<SingleUserInfo info={item}/>}
                                 title="User Info"
                                 trigger="click"
                        >
                            <div className="user-info-btn">
                                <Icon type="info-circle" theme="outlined" />
                            </div>
                        </Popover>
                    </List.Item>
                )}
            />
            </Fragment>
        )
    } else {
        return <div></div>
    }


};

export default ListUserActive;