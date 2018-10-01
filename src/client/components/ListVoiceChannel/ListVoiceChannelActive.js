import React,{Fragment} from 'react'
import {List,Button,Divider,Modal,Popover,Icon,Tag} from 'antd'
import './ListVoiceChannel.css'

const ListVoiceChannelActive = (props) => {

    const {listOfGuilds, server} = props;
    let listOfVoiceChannelsInServer = [];

    if (server) {
        /*for (let i = 0; i < listOfGuilds.length; i++) {
            if (listOfGuilds[i].server === server) {
                for (let x = 0; x < listOfGuilds[i].usersActive.length; x++) {
                    if (listOfGuilds[i].serverAdmins.includes(listOfGuilds[i].usersActive[x])) 
                        listOfAdminsInServer.push(listOfGuilds[i].usersActive[x]);
                    else 
                        listOfMembersInServer.push(listOfGuilds[i].usersActive[x]);
                }
            }
        }*/
        return (
            <Fragment>
                <h3 style={{textAlign:'center'}}>Voice Channels</h3>
                <List
                locale = {{emptyText: "No voice channels in this server"}}
                bordered
                dataSource={listOfVoiceChannelsInServer}
                renderItem={item => (
                    <List.Item
                        actions={
                            [
                                <Button onClick={() => props.handlePlayMusic(props.server)}>Play Sound</Button>,
                            ]
                        }
                    >
                        {item.tag} &nbsp;
                        &nbsp; {item.bot ? <Tag color="blue">BOT</Tag>:null}
                    </List.Item>
                )}
            />
            </Fragment>
        )
    } else {
        return <div></div>
    }


};

export default ListVoiceChannelActive;

