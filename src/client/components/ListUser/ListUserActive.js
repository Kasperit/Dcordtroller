import React,{Fragment} from 'react'
import {List,Card,Button,Icon,Col,Modal} from 'antd'
import './ListUser.css'


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
                        listOfAdminsInServer.push(listOfGuilds[i].usersActive[x].tag);
                    else 
                        listOfMembersInServer.push(listOfGuilds[i].usersActive[x].tag);
                }
            }
        }
        return (
            <Fragment>
            <List
                locale = {{emptyText: "No user in this server"}}
                bordered
                dataSource={listOfAdminsInServer}
                renderItem={item => (
                    <List.Item
                        actions={
                            [
                                <img src="https://www.freeiconspng.com/uploads/crown-icon-28.png" width="10%" height="10%" align="right"/>
                            ]
                        }
                    >
                        {item}
                    </List.Item>
                )}
            />,
            <List
                locale = {{emptyText: "No user in this server"}}
                bordered
                dataSource={listOfMembersInServer}
                renderItem={item => (
                    <List.Item
                        actions={
                            [
                                <Button onClick={() => showConfirm(item, server, "kick")}>Kick</Button>,
                                <Button onClick={() => showConfirm(item, server)}>Ban</Button>
                            ]
                        }
                    >
                        {item}
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