import React, {Component,Fragment} from 'react';
import './connection.css'
import Layout from '../Layout/Layout'
import BotFunctions from '../Bot/BotFunctions'
class connectionToDiscord extends Component {
    constructor(props){
        super(props);
        this.state = {
            listOfGuilds:null
        }
    }

    /*shouldComponentUpdate(nextProps,nextState){
        if(this.state.listOfGuilds){
            for(let i = 0; i<this.state.listOfGuilds.length;i++){
                if(this.state.listOfGuilds[i].usersActive.length !== nextState.listOfGuilds[i].usersActive.length){
                    return true
                }
            }
        } else {
            return true;
        }
    }
    */

    componentDidMount(){
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
                client: client.user.tag
            });
        });

        client.on("guildCreate", guild => {
            console.log("Joined a new guild: " + guild.name);

            console.log(guild.channel.id);
            //Your other stuff like adding to guildArray
        });

        client.on('message', msg => {
            this.handleReceiveMsg(msg);
            console.log(msg)
            console.log(this.state.listOfGuilds)
            //console.log(msg.guild.roles.get('486781248446922762').members.map(m=>m.roles));
            //client.channels.get("id", client.channels.get("name", "general").id).sendMessage("Testing");
        });

    }

    handleReceiveMsg = (event) => {
        this.setState({
            msgInfo: {
                userMsg: event.author,
                contentMsg: event.content,
                serverId: event.channel.guild.id
            }
        });
    };

    render(){
        const {listOfGuilds,msgInfo,client} = this.state;
        console.log(listOfGuilds)
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
                        infoFromDiscord={listOfGuilds}
                    />
                    <BotFunctions
                        msg = {msgInfo}
                        infoFromDiscord={listOfGuilds}
                    />
                </Fragment>
            );
        }
    }
}

export default connectionToDiscord