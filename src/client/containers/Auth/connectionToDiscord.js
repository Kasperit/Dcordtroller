import React, {Component,Fragment} from 'react';
import './connection.css'
import Layout from '../Layout/Layout'
import BotFunctions from '../Bot/BotFunctions'
import axios from 'axios'
class connectionToDiscord extends Component {
    constructor(props){
        super(props);
        this.state = {
            listOfGuilds:null,
            listOfBannedWords:[]
        }
    }
    componentDidMount(){
        axios.get(`https://dcordtroller-server.herokuapp.com/api/bot/asdasdsad%230617`)
            .then(res => {
                this.setState({
                    listOfBannedWords: res.data.blackListWords
                })
            })
        const Discord = require('discord.js');
        const client = new Discord.Client();
        client.login('NDg2NDgzMTc3NjI0MzA1Njc0.DnEGnA.0e9GJA_nkFkXLTbxePjfaqkrNIM');
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
            let listOfGuilds = [];
            const listOfGuildsFormat = client.guilds.array();
            for(let i = 0; i< listOfGuildsFormat.length; i++) {
                let listOfMembersActive = [];
                let listOfMembersBanned = [];
                let listOfServerAdmins = [];
                let listOfMemberObjects = [];
                listOfGuildsFormat[i].fetchBans().then(function(users) {
                    Array.from(users).forEach(e => {
                        listOfMembersBanned.push(e[1]);
                    });
                });
                for (let x = 0; x < listOfGuildsFormat[i].members.array().length; x++) {
                    if (listOfGuildsFormat[i].members.array()[x].permissions.has("KICK_MEMBERS")) {
                        listOfServerAdmins.push(listOfGuildsFormat[i].members.array()[x].user);
                    }
                    listOfMembersActive.push(listOfGuildsFormat[i].members.array()[x].user);
                    listOfMemberObjects.push(listOfGuildsFormat[i].members.array()[x]);
                }
                listOfGuilds.push(
                    {
                        serverObject: listOfGuildsFormat[i],
                        server: listOfGuildsFormat[i].name,
                        serverAdmins: listOfServerAdmins,
                        usersActive: listOfMembersActive,
                        memberObjects: listOfMemberObjects,
                        usersBanned: listOfMembersBanned
                    }
                )
            }

            this.setState({
                listOfGuilds: listOfGuilds,
                client: client
            });
        });

        client.on("guildCreate", guild => {
            console.log("Joined a new guild: " + guild.name);

            console.log(guild.channel.id);
            //Your other stuff like adding to guildArray
        });

        client.on('message', msg => {
            this.handleReceiveMsg(msg,client);
            //console.log(msg.guild.roles.get('486781248446922762').members.map(m=>m.roles));
            //client.channels.get("id", client.channels.get("name", "general").id).sendMessage("Testing");
        });


    }

    handleReceiveMsg = (event,client) => {
        this.setState({
            msgInfo: {
                userMsg: event.author,
                contentMsg: event.content,
                serverId: event.channel.guild.id,
                client: client,
                msgObj: event
            }
        });
    };

    render(){
        const {listOfGuilds,msgInfo,client,listOfBannedWords} = this.state;
        if(!listOfGuilds){
            return (
                <Fragment>
                    <div className="lds-css ng-scope">
                        <div style={{width:"100%",height:"100%"}} className="lds-double-ring"><div></div><div></div></div>
                    </div>

                </Fragment>)
        } else {
            return (
                <Fragment>
                    <Layout
                        {...this.props}
                        infoFromDiscord={listOfGuilds}
                        client = {client}
                        newListOfBannedWords={(listOfBannedWords) => this.setState({listOfBannedWords:listOfBannedWords})}
                    />
                    <BotFunctions
                        msg = {msgInfo}
                        infoFromDiscord={listOfGuilds}
                        listOfBannedWords = {listOfBannedWords}
                    />
                </Fragment>
            );
        }
    }
}

export default connectionToDiscord