import React, { Fragment } from 'react'
import { List, Button, Input, Tag } from 'antd'
import './ListVoiceChannel.css'

const ListVoiceChannelActive = (props) => {

    const { listOfGuilds, server } = props;
    let listOfVoiceChannelsInServer = [];
    let url;

    const saveInput = (input) => {
        url = input;
    };


    if (server) {
        console.log(listOfGuilds[0].guildVoiceChannels);
        for (let i = 0; i < listOfGuilds.length; i++) {
            if (listOfGuilds[i].server === server) {
                for (let x = 0; x < listOfGuilds[i].guildVoiceChannels.length; x++) {
                    listOfVoiceChannelsInServer.push(listOfGuilds[i].guildVoiceChannels[x]);
                }
            }
        }
        return (
            <Fragment>
                <List
                    locale={{ emptyText: "No voice channels in this server" }}
                    bordered
                    dataSource={listOfVoiceChannelsInServer}
                    renderItem={item => (
                        <List.Item
                            actions={
                                [
                                    <Button onClick={() => props.handlePlayMusic({ item, server, url })}>Play Sound</Button>,
                                    <Input placeholder="URL" onChange={evt => saveInput(evt.target.value)} />
                                ]
                            }
                        >
                            {item.name} &nbsp;
                        &nbsp; {item.bot ? <Tag color="blue">BOT</Tag> : null}
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

