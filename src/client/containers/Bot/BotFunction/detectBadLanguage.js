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
        let {listOfBannedWords} = this.state;

        if(msg){
            for(let i = 0; i< listOfGuilds.length;i++){
                for(let j = 0; j< listOfGuilds[i].serverAdmins.length; j++){
                    if(msg.userMsg.tag === listOfGuilds[i].serverAdmins[j].tag){
                        return null
                    }
                }
            }
            const channelId = msg.client.channels.get(msg.msgObj.channel.id);
            let msgContent = msg.contentMsg.slice(0);
            let msgContentArray = msgContent.split(' ');
            msgContentArray = msgContentArray.map(ele => ele.toLowerCase());
            listOfBannedWords =listOfBannedWords.map(ele => ele.toLowerCase());
            for(let i = 0; i< msgContentArray.length; i++){
                if(listOfBannedWords.indexOf(msgContentArray[i]) > -1){
                    this.state[msg.userMsg.tag] === 1 ?
                        channelId.send(`Warning! User ${msg.userMsg.tag} please do not use bad words. This is the ${this.state[msg.userMsg.tag]}st time`) :
                        this.state[msg.userMsg.tag] === 2 ?
                        channelId.send(`Warning! User ${msg.userMsg.tag} please do not use bad words. This is the ${this.state[msg.userMsg.tag]}nd time. Next time you will be kicked`) :
                            this.state[msg.userMsg.tag] === 3 ?
                            channelId.send(`User ${msg.userMsg.tag} is kicked !`):
                                channelId.send(`Warning! User ${msg.userMsg.tag} please do not use bad words. This is the ${this.state[msg.userMsg.tag]} time`)
                    this.warningCount(msg.userMsg.tag);
                    return null;
                }
            }
        }
        return null;
    }
}

export default detectBadLanguage