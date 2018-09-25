import React,{Component} from 'react';
import ListServerContainer from './ListServerContainers'
import {Spin,Icon,Col,Row} from 'antd'

class ListUserContainers extends Component{
    constructor(props){
        super(props);
        this.state = {
            listOfGuilds: null
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        return !(nextProps.location.path === this.props.location.path && nextState === this.state);
    }

    componentDidMount(){
        const Discord = require('discord.js');
        const client = new Discord.Client();

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
            let listOfGuilds = [];
            const listOfGuildsFormat = client.guilds.array();
            for(let i = 0; i< listOfGuildsFormat.length; i++) {
                let listOfMembersActive = [];
                let listOfMembersBanned = [];
                listOfGuildsFormat[i].fetchBans().then(function(users) {
                    Array.from(users).forEach(e => {
                        listOfMembersBanned.push(e[1]);
                    });
                });
                for (let x = 0; x < listOfGuildsFormat[i].members.array().length; x++) {
                    listOfMembersActive.push(listOfGuildsFormat[i].members.array()[x].user)
                }
                listOfGuilds.push(
                    {
                        serverObject: listOfGuildsFormat[i],
                        server: listOfGuildsFormat[i].name,
                        usersActive: listOfMembersActive,
                        usersBanned: listOfMembersBanned
                    }
                )
            }
            this.setState({
                listOfGuilds: listOfGuilds,
                listOfBannedWords: ["TEST","TEST1"]
            });
        });

        client.on("guildCreate", guild => {
            console.log("Joined a new guild: " + guild.name);

            console.log(guild.channel.id);
            //Your other stuff like adding to guildArray
        });

        client.on('message', msg => {
            this.handleReceiveMsg(msg);
            //console.log(msg.guild.roles.get('486781248446922762').members.map(m=>m.roles));
            //client.channels.get("id", client.channels.get("name", "general").id).sendMessage("Testing");
        });

        client.login('NDg2NDgzMTc3NjI0MzA1Njc0.DnEGnA.0e9GJA_nkFkXLTbxePjfaqkrNIM');
    }

    handleReceiveMsg = (event) => {
        console.log(event.author)
        this.setState({
            msgInfo: {
                userMsg: event.author,
                contentMsg: event.content
            }
        });

        //client.channels.get("448847115620450314").send('My Message');
    }



    render(){
        const iconLoading = <Icon type="loading" style={{ fontSize: 40 }} spin />;
        const {listOfGuilds,msgInfo,listOfBannedWords} = this.state;
        if(msgInfo){
            if(listOfBannedWords.indexOf(msgInfo.contentMsg) > -1){
                console.log(`User ${msgInfo.userMsg.tag} use bad words`)
            }
        }

        if(listOfGuilds){
            return (
                <div>
                    <Col span={16}>
                        <ListServerContainer
                            listOfGuilds={listOfGuilds}
                        />
                    </Col>
                </div>
            )
        } else {
            return (
                <div>
                    <Spin indicator={iconLoading}/>
                </div>
            )
        }

    }
}

export default ListUserContainers;

