import React,{Fragment,Component} from 'react'
import {Col,Row} from 'antd'
import ListServer from '../../components/ListServer/ListServer'
import ListVoiceChannel from '../../components/ListVoiceChannel/ListVoiceChannel'

class ListChannelContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            server:null,
            listOfGuilds: this.props.listOfGuilds
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return !(this.state.server === nextState.server) || this.state.listOfGuilds !== nextState.listOfGuilds
    }

    /*handleKickUser = (user,server) => {
        let listOfGuilds = [...this.state.listOfGuilds];
        for(let i = 0; i< listOfGuilds.length; i++) {
            if(listOfGuilds[i].server === server) {
                let userInSingleGuild = [...listOfGuilds[i].usersActive];
                let userInSingleGuildMemberObject = [...listOfGuilds[i].memberObjects];
                for (let x = 0; x < userInSingleGuild.length; x++) {
                    if (userInSingleGuild[x].tag === user) {
                        // This kicks the user from the discord serverr
                        //userInSingleGuildMemberObject[x].kick();
                        userInSingleGuild.splice(x, 1);
                    }
                }
                listOfGuilds[i].usersActive = [...userInSingleGuild]
            }
        }
        this.setState({
            listOfGuilds:listOfGuilds
        });
        console.log(`Kick ${user} in server ${server}`)
    };

    handleBanUser = (user,server) => {
        let listOfGuilds = [...this.state.listOfGuilds];
        for(let i = 0; i< listOfGuilds.length; i++) {
            if(listOfGuilds[i].server === server) {
                let userInSingleGuild = [...listOfGuilds[i].usersActive];
                let userInSingleGuildMemberObject = [...listOfGuilds[i].memberObjects];
                let userBannedInSingleGuild = [...listOfGuilds[i].usersBanned];
                for (let x = 0; x < userInSingleGuild.length; x++) {
                    if (userInSingleGuild[x].tag === user) {
                        // This kicks the user from the discord server
                        userBannedInSingleGuild.push(userInSingleGuild[x]);
                        //userInSingleGuildMemberObject[x].ban();
                        userInSingleGuild.splice(x, 1);
                    }
                }
                listOfGuilds[i].usersActive = [...userInSingleGuild];
                listOfGuilds[i].usersBanned = [...userBannedInSingleGuild];
            }
        }
        this.setState({
            listOfGuilds:listOfGuilds
        });
        console.log(`Ban ${user} in server ${server}`)
    };

    handleUnBanUser = (user,server) => {
        let listOfGuilds = [...this.state.listOfGuilds];
        for(let i = 0; i< listOfGuilds.length; i++) {
            if(listOfGuilds[i].server === server) {
                let userInSingleGuild = [...listOfGuilds[i].usersActive];
                let userBannedInSingleGuild = [...listOfGuilds[i].usersBanned]
                for (let x = 0; x < userBannedInSingleGuild.length; x++) {
                    if (userBannedInSingleGuild[x].tag === user) {
                        listOfGuilds[i].serverObject.unban(userBannedInSingleGuild[x].id);
                        userBannedInSingleGuild.splice(x, 1);
                    }
                }
                listOfGuilds[i].usersActive = [...userInSingleGuild];
                listOfGuilds[i].usersBanned = [...userBannedInSingleGuild];
            }
        }
        this.setState({
            listOfGuilds:listOfGuilds
        });
        console.log(`UnBan ${user} in server ${server}`)
    }*/

    handlePlayMusic = (server) => {

    }


    render(){
        let {listOfGuilds,server} = this.state;
        let listOfVoice = null;
        let listServer = [];
        if(server){
            listOfVoice =
                <ListVoiceChannel
                    listOfGuilds={listOfGuilds}
                    server={server}
                    handlePlayMusic={(server) => this.handlePlayMusic(server)}
                    closeUserList = {() => this.setState({server:null})}
                />
        }
        for(let i = 0; i< listOfGuilds.length; i++){
            listServer.push(listOfGuilds[i].server)
        }
        return (
            <Fragment>
                <Row>
                <ListServer
                    listServer={listServer}
                    server={server}
                    chooseServer = {(server) => this.setState({server})}
                />
                {listOfVoice}
                </Row>
            </Fragment>
        )
    }
}

export default ListChannelContainer;