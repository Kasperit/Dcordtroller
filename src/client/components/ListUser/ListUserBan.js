import React, {Component} from 'react'
import SingleUserInfo from './SingleUserInfo'

import {List,Modal,Button,Popover,Icon} from 'antd'


const ListUserBan = (props) => {
    const confirm = Modal.confirm;

    const showConfirm = (item, server) => {
        confirm({
            title: `Do you want to unban ${item}?`,
            content: `${item} will be able to join your server`,
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
                    listOfMembersBannedInServer.push(listOfGuilds[i].usersBanned[x])
                }
            }
        }
        return (
            <List
                locale = {{emptyText: "No users banned in this server"}}
                bordered
                dataSource={listOfMembersBannedInServer}
                renderItem={item => (
                    <List.Item
                        actions={
                            [
                                <Button onClick={() => showConfirm(item.tag, server)}>Unban</Button>
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

        )
    } else {
        return <div></div>
    }


};

export default ListUserBan;
