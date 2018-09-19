import React from 'react'
import {List,Card,Button} from 'antd'

const ListUser = (props) => {
    const {listOfGuilds,server} = props;
    let listOfMembersInServer = [];
    if(server){
        for(let i = 0; i< listOfGuilds.length; i++){
            if(listOfGuilds[i].server === server){
                for (let x = 0; x < listOfGuilds[i].users.length; x++) {
                    listOfMembersInServer.push(listOfGuilds[i].users[x].user.tag)
                }
            }
        }
        return (
            <Card
                title="Users"
                bodyStyle={{height:'400px',overflowY:'scroll'}}
            >
                <List
                    bordered
                    dataSource={listOfMembersInServer}
                    renderItem={item => (
                        <List.Item
                            actions={
                                [
                                    <Button onClick={() => props.handleKickUser(item,server)}>Kick</Button>,
                                    <Button onClick={() => props.handleBanUser(item,server)}>Ban</Button>
                                ]
                            }
                        >
                            {item}
                        </List.Item>
                    )}
                />
            </Card>
        )
    } else {
        return(
            <div>
            </div>
        )
    }
};

export default ListUser;