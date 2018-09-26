import React from 'react'
import {Col,Row} from 'antd'
import './ListUser.css'
const singleUserInfo = (props) => {
    console.log(props.info)
    return (
        <div className="user-info-content">
            <Row gutter="24">
                <Col span="8">
                {props.info.avatarURL === null  ? <img className="user-ava-img" src="https://ubisafe.org/images/discord-transparent-background-2.png"/> : <img className="user-ava-img" src={props.info.avatarURL}/>}                  
                </Col>
                <Col span="16">
                    <p>Username: {props.info.username}</p>
                    <p>Tag: {props.info.tag}</p>
                    <p>Role: {props.admin ? 'Admin' : 'User'}</p>
                </Col>
            </Row>
        </div>
    )
};

export default singleUserInfo;

