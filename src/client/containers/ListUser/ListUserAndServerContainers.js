import React,{Component} from 'react';
import ListServerContainer from './ListServerContainers'
import {Spin,Icon,Col,Row} from 'antd'

class ListUserContainers extends Component{
    constructor(props){
        super(props);
        this.state = {
            listOfGuilds: null
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        return !(nextProps.location.path === this.props.location.path
                && nextState === this.state)
    }

    componentDidMount(){
        this.props.infoFromDiscord ? this.setState({listOfBannedWords: ["TEST","TEST1"]}) : this.setState({listOfBannedWords: ["TEST","TEST1"]})
    }

    render(){
        const iconLoading = <Icon type="loading" style={{ fontSize: 40 }} spin />;
        const {infoFromDiscord} = this.props;
        if(infoFromDiscord){
            return (
                <div>
                    <Col span={16}>
                        <ListServerContainer
                            listOfGuilds={infoFromDiscord}
                        />
                    </Col>
                </div>
            )
        } else {
            return (
                <div>
                    <Spin indicator={iconLoading}/>
                </div>
            )
        }

    }
}

export default ListUserContainers;

