import React,{Component} from 'react'
class detectBadLanguage extends Component{
    constructor(props){
        super(props);
        this.state = {
            listOfBannedWords: ["TEST","TEST1"],
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        return !(this.props.msg && this.props.msg.contentMsg === nextProps.msg.contentMsg);
    }

    componentDidMount(){
        for(let i = 0; i< this.props.listOfGuilds.length; i++){
            for(let j = 0; j < this.props.listOfGuilds[i].usersActive.length; j++){
                this.setState({
                    [this.props.listOfGuilds[i].usersActive[j].tag]: 1
                })
            }
        }
    }

    warningCount = (userTag) => {
        this.setState(prevState => {
            return {
                [userTag]: prevState[userTag] + 1,
            }
        },() => {
            if(this.state[userTag] > 3) {
                this.props.handleKickUserByBot(userTag)
            }
        })
    };

    render(){
        const {msg,listOfGuilds} = this.props;
        const {listOfBannedWords} = this.state;

        if(msg){
            for(let i = 0; i< listOfGuilds.length;i++){
                console.log(listOfGuilds[i].serverAdmins);
                for(let j = 0; j< listOfGuilds[i].serverAdmins.length; j++){
                    if(msg.userMsg.tag === listOfGuilds[i].serverAdmins[j].tag){
                        return null
                    }
                }
            }
            const channelId = msg.client.channels.get(msg.msgObj.channel.id);
            if(listOfBannedWords.indexOf(msg.contentMsg) > -1){
                this.state[msg.userMsg.tag] === 2 ?
                    channelId.send(`Warning! User ${msg.userMsg.tag} please do not use bad words. This is the ${this.state[msg.userMsg.tag]} time. Next time you will be kicked`) :
                    channelId.send(`Warning! User ${msg.userMsg.tag} please do not use bad words. This is the ${this.state[msg.userMsg.tag]} time`);
                this.warningCount(msg.userMsg.tag)
            }
        }
        return null;
    }
}

export default detectBadLanguage