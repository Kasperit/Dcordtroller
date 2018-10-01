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

    handleChange = (value) => {
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
        let blackListWords = {
            blackListWords: this.updatedBlackWords.length > 0 ? this.updatedBlackWords : this.props.listOfBannedWords
        };
        axios.patch('https://dcordtroller-server.herokuapp.com/api/bot/asdasdsad%230617',blackListWords)
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
        const {listOfBannedWords} = this.props
        const children = [];
        for (let i = 0; i < listOfBannedWords.length; i++) {
            children.push(<Option key={listOfBannedWords[i]}>{listOfBannedWords[i]}</Option>);
        }
        if(listOfBannedWords.length>0){
            return (
                <div>
                    <Button disabled={editBtnDisabled} onClick={() => this.handleEdit()}>Edit</Button>
                    <Button disabled={saveBtnDisabled} onClick ={() => this.handleSave()}>Save</Button>
                    <br /><br />
                    <Select
                        mode="tags"
                        size={"large"}
                        placeholder="Please select"
                        defaultValue={listOfBannedWords}
                        onChange={this.handleChange}
                        style={{ width: '50%' }}
                        disabled = {disabled}
                    >
                        {children}
                    </Select>
                </div>
            );
        } else {
            return <div>
                <Button disabled={editBtnDisabled} onClick={() => this.handleEdit()}>Edit</Button>
                <Button disabled={saveBtnDisabled} onClick ={() => this.handleSave()}>Save</Button>
                <br /><br />
                <Select
                    mode="tags"
                    size={"large"}
                    placeholder="Please select"
                    defaultValue={[]}
                    onChange={this.handleChange}
                    style={{ width: '50%' }}
                    disabled = {disabled}
                >
                    {children}
                </Select>
            </div>
        }

    }
}
export default BlacklistWords;