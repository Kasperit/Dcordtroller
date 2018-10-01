import React, {Component,Fragment} from 'react'
import BlacklistWordsContainer from './BlacklistWordsContainer'

class BotConfigContainer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <p style = {{fontSize:'1.2em',fontWeight:'bold'}}>Logged in as BOT {this.props.client.user.tag}</p>
                <p style = {{fontSize:'1.2em',fontWeight:'bold'}}>Config blacklist words:</p>
                <BlacklistWordsContainer
                    listOfBannedWords = {this.props.listOfBannedWords}
                    newListOfBannedWords={(listOfBannedWords) => this.props.newListOfBannedWords(listOfBannedWords)}
                />
            </div>
        )
    }
}

export default BotConfigContainer
