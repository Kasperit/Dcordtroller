import React,{Component} from 'react';
import ListUser from '../components/ListUser'

class ListUserContainers extends Component{
    constructor(props){
        super(props);
        this.state = {
            listOfGuilds: null
        }
    }

    componentDidMount(){
        const Discord = require('discord.js');
        const client = new Discord.Client();

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
            this.setState({
                listOfGuilds: client.guilds.array()
            });
            for (let index = 0; index < client.guilds.array().length; index++) {
                console.log(client.guilds.array()[index].name);
                //console.log(client.guilds.array()[index].id);
            }
        });

        client.on("guildCreate", guild => {
            console.log("Joined a new guild: " + guild.name);

            console.log(guild.channel.id);
            //Your other stuff like adding to guildArray
        });

        client.on('message', msg => {
            this.handleChangeWeight(msg);
            console.log(msg.guild.roles.get('486781248446922762').members.map(m=>m.roles));
            //client.channels.get("id", client.channels.get("name", "general").id).sendMessage("Testing");
        });

        client.login('NDg2NDgzMTc3NjI0MzA1Njc0.DnEGnA.0e9GJA_nkFkXLTbxePjfaqkrNIM');
    }

    handleChangeWeight = (event) => {
        //this.setState({weight: event.target.value});
        this.setState({ weight: `${event.author.username}` + ": " + event.content });
        this.setState({ url: event.author.avatarURL});

        //client.channels.get("448847115620450314").send('My Message');
    }


    render(){
        const {listOfGuilds} = this.state;
        console.log(listOfGuilds);
        if(listOfGuilds){
            return (
                <div>
                    <h1>List Of User</h1>
                    <ListUser
                        listOfGuilds = {listOfGuilds}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <h1>List Of User</h1>
                    <p>Data is fetching....</p>
                </div>
            )
        }

    }
}

export default ListUserContainers;
