import React,{Fragment,Component} from 'react'
import {Col,Row} from 'antd'
import ListServer from '../../components/ListServer/ListServer'
import ListUser from '../../components/ListUser/ListUser'

class ListServerContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            server:null,
            listOfGuilds: this.props.listOfGuilds
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return !(this.state === nextState)
    }

    handleKickUser = (user,server) => {
        let listOfGuilds = [...this.state.listOfGuilds];
        for(let i = 0; i< listOfGuilds.length; i++) {
            if(listOfGuilds[i].server === server) {
                let userInSingleGuild = [...listOfGuilds[i].users]
                for (let x = 0; x < userInSingleGuild.length; x++) {
                    if (userInSingleGuild[x].user.tag === user) {
                        // This kicks the user from the discord server
                        //userInSingleGuild[x].kick();     TODO: Lets remove this from comments once we are done
                        userInSingleGuild.splice(x, 1);
                    }
                }
                listOfGuilds[i].users = [...userInSingleGuild]
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
                let userInSingleGuild = [...listOfGuilds[i].users]
                for (let x = 0; x < userInSingleGuild.length; x++) {
                    if (userInSingleGuild[x].user.tag === user) {
                        // This bans the user from the discord server
                        //userInSingleGuild[x].ban();     //TODO: Lets remove this from comments once we are done
                        userInSingleGuild.splice(x, 1);
                    }
                }
                listOfGuilds[i].users = [...userInSingleGuild]
            }
        }
        this.setState({
            listOfGuilds:listOfGuilds
        });
        console.log(`Ban ${user} in server ${server}`)
    };


    render(){
        let {listOfGuilds,server} = this.state;
        let listOfUser = null;
        let listServer = [];
        if(server){
            listOfUser =
                <ListUser
                    listOfGuilds={listOfGuilds}
                    server={server}
                    handleKickUser={(user, server) => this.handleKickUser(user, server)}
                    handleBanUser={(user, server) => this.handleBanUser(user, server)}
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
                {listOfUser}
                </Row>
            </Fragment>
        )
    }
}

export default ListServerContainer;