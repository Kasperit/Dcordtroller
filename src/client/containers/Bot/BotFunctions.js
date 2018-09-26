import React,{Component} from 'react'
import DetectBadLanguage from './BotFunction/detectBadLanguage'
class BotFunctions extends Component{
    constructor(props){
        super(props)
        this.state = {
            listOfGuilds: this.props.infoFromDiscord
        }
    }

    handleKickUserByBot = (userTag) => {
        let listOfGuilds = [...this.props.infoFromDiscord];
        for(let i = 0; i<listOfGuilds.length; i++){
            if(listOfGuilds[i].serverObject.id === this.props.msg.serverId) {
                let userInSingleGuild = [...listOfGuilds[i].usersActive]
                let userInSingleGuildMemberObject = [...listOfGuilds[i].memberObjects];
                for (let j = 0; j < userInSingleGuild.length; j++) {
                    if (userInSingleGuild[j].tag === userTag) {
                        userInSingleGuildMemberObject[j].kick();
                        userInSingleGuild.splice(j, 1);
                    }
                }
                listOfGuilds[i].usersActive = [...userInSingleGuild]
            }
        }
        //this.props.newListOfGuilds(listOfGuilds);
        console.log(`Kick ${userTag} in server ${this.props.msg.serverId}`)
    };

    render(){
        return(
            <DetectBadLanguage
                msg = {this.props.msg}
                listOfGuilds = {this.props.infoFromDiscord}
                handleKickUserByBot = {(userTag) => this.handleKickUserByBot(userTag)}
            />
        )
    }
}

export default BotFunctions;
