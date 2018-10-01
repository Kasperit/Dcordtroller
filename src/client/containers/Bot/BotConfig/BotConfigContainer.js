import React, {Component,Fragment} from 'react'
import BlacklistWordsContainer from './BlacklistWordsContainer'

class BotConfigContainer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <p>You are logged in as BOT {this.props.client.user.tag}</p>
                <p>Config blacklist words:</p>
                <BlacklistWordsContainer
                    listOfBannedWords = {this.props.listOfBannedWords}
                    newListOfBannedWords={(listOfBannedWords) => this.props.newListOfBannedWords(listOfBannedWords)}
                />
            </div>
        )
    }
}

export default BotConfigContainer
