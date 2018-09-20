import React from 'react'
import {List,Card,Icon} from 'antd'
import './ListServer.css'

const ListServer = (props) => {
    const {listOfGuilds,serverSelected} = props;
    let listServer = [];
    for(let i = 0; i< listOfGuilds.length; i++){
        listServer.push(listOfGuilds[i].server)
    }
    return (
        <Card
            title="Servers"
            bodyStyle={{height:'400px'}}
        >
            <List

                bordered
                dataSource={listServer}
                renderItem={item => (
                    <List.Item
                        onClick = {() => props.chooseServer(item)}
                        actions={[<Icon type="right"/>]}
                        className={serverSelected === item ? 'list-server-active' : 'list-server'}
                    >
                        {item}
                    </List.Item>
                )}
            />
        </Card>
    )
};

export default ListServer;