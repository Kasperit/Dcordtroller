import React,{Component} from 'react'

class detectBadLanguage extends Component{
    constructor(props){
        super(props);
        this.state = {
            listOfBannedWords: ["TEST","TEST1"]
        }
    }

    render(){
        const {msg} = this.props;
        const {listOfBannedWords} = this.state;
        if(msg){
            if(listOfBannedWords.indexOf(msg.contentMsg) > -1){
                console.log(`User ${msg.userMsg.tag} use bad words`)
                this.props.handleKickUserByBot(msg.userMsg.tag)
            }
        }
        return null;
    }
}

export default detectBadLanguage