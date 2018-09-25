import React, {Component} from 'react'

import {List,Modal,Button} from 'antd'


const ListUserBan = (props) => {
    const confirm = Modal.confirm;

    const showConfirm = (item, server) => {
        confirm({
            title: `Do you want to unban ${item}?`,
            content: `${item} will then join your server`,
            onOk() {
                props.handleUnBanUser(item, server)
            },
            onCancel() {
            },
        });
    };

    const {listOfGuilds, server} = props;
    let listOfMembersBannedInServer = [];
    if (server) {
        for (let i = 0; i < listOfGuilds.length; i++) {
            if (listOfGuilds[i].server === server) {
                for (let x = 0; x < listOfGuilds[i].usersBanned.length; x++) {
                    listOfMembersBannedInServer.push(listOfGuilds[i].usersBanned[x].tag)
                }
            }
        }
        return (
            <List
                locale = {{emptyText: "No user in this server"}}
                bordered
                dataSource={listOfMembersBannedInServer}
                renderItem={item => (
                    <List.Item
                        actions={
                            [
                                <Button onClick={() => showConfirm(item, server)}>Unban</Button>
                            ]
                        }
                    >
                        {item}
                    </List.Item>
                )}
            />

        )
    } else {
        return <div></div>
    }


};

export default ListUserBan;
