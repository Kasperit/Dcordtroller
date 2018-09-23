import React,{Fragment,Component} from 'react'
import {List,Card,Icon,Col,Row} from 'antd'
import './ListServer.css'

const ListServer = (props) => {
    let {listServer,server} = props;
    return (
        <Col span={10}>
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
                            className={server === item ? 'list-server-active' : 'list-server'}
                        >
                            {item}
                        </List.Item>
                    )}
                    />
            </Card>
        </Col>
    )
};


export default ListServer;