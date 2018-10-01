import React, {Component} from 'react';
import { Select,Button,Spin } from 'antd';
import axios from 'axios'
const Option = Select.Option;
class BlacklistWords extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            disabled: true,
            editBtnDisabled: false,
            saveBtnDisabled: true,
            blackListWords:[]
        }
    }
    updatedBlackWords=[];

    componentDidMount(){
        axios.get('https://dcordtroller-server.herokuapp.com/api/bot/asdasdsad%230617')
            .then(res => {
                this.setState({
                    blackListWords: res.data.blackListWords,
                    botName: res.data.botName,
                    botId: res.data.botId
                })
            })
    }
    handleChange = (value) => {
        console.log(value)
        this.updatedBlackWords = value
    };

    handleEdit = () => {
        this.setState({
            disabled: false,
            editBtnDisabled: true,
            saveBtnDisabled: false
        })
    };

    handleSave = () => {
        axios.patch('https://dcordtroller-server.herokuapp.com/api/bot/asdasdsad%230617',{blackListWords:this.updatedBlackWords})
            .then(res => {
                this.props.newListOfBannedWords(res.data.blackListWords)
                this.setState({
                    disabled: true,
                    editBtnDisabled: false,
                    saveBtnDisabled: true,
                    blackListWords: res.data.blackListWords
                })
            })
    }
    render() {
        const {disabled,editBtnDisabled,saveBtnDisabled,blackListWords} = this.state;
        const children = [];
        for (let i = 0; i < blackListWords.length; i++) {
            children.push(<Option key={blackListWords[i]}>{blackListWords[i]}</Option>);
        }
        if(blackListWords.length > 0){
            return (
                <div>
                    <Button disabled={editBtnDisabled} onClick={() => this.handleEdit()}>Edit</Button>
                    <Button disabled={saveBtnDisabled} onClick ={() => this.handleSave()}>Save</Button>
                    <br /><br />
                    <Select
                        mode="tags"
                        size={"large"}
                        placeholder="Please select"
                        defaultValue={blackListWords}
                        onChange={this.handleChange}
                        style={{ width: '100%' }}
                        disabled = {disabled}
                    >
                        {children}
                    </Select>
                </div>
            );
        } else {
            return <Spin/>
        }

    }
}
export default BlacklistWords;