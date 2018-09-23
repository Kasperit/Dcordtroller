import React,{Fragment} from 'react'
import {List,Card,Button,Icon,Col,Modal} from 'antd'
import './ListUser.css'


const ListUser = (props) => {
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
    if (server) {
        for (let i = 0; i < listOfGuilds.length; i++) {
            if (listOfGuilds[i].server === server) {
                for (let x = 0; x < listOfGuilds[i].users.length; x++) {
                    listOfMembersInServer.push(listOfGuilds[i].users[x].user.tag)
                }
            }
        }
        return (
            <Col span={14}>
                <Card
                    title="Users"
                    bodyStyle={{height: '400px', overflowY: 'scroll'}}
                    extra={
                        <Icon
                            type="close"
                            theme="outlined"
                            className="close-btn"
                            onClick={() => props.closeUserList()}
                        />}
                >
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
                </Card>
            </Col>
        )
    } else {
        return <div></div>
    }


};

export default ListUser;