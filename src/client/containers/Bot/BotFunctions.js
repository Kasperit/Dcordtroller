import React,{Component} from 'react'
import DetectBadLanguage from './BotFunction/detectBadLanguage'
class BotFunctions extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <DetectBadLanguage
                msg = {this.props.msg}
            />
        )
    }
}

export default BotFunctions;
