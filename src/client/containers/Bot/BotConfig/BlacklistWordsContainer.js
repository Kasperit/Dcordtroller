import React, {Component} from 'react';
import { Select,Button } from 'antd';
const Option = Select.Option;
class BlacklistWords extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            disabled: true
        }
    }
    handleChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    handleEdit = () => {
        this.setState({
            disabled: false
        })
    };

    handleSave = () => {
        this.setState({
            disabled: true
        })
    }
    render() {
        const {disabled} = this.state;
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        return (
            <div>
                <Button onClick={() => this.handleEdit()}>Edit</Button>
                <Button onClick ={() => this.handleSave()}>Save</Button>
                <br /><br />
                <Select
                    mode="multiple"
                    size={"large"}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                    disabled = {disabled}
                >
                    {children}
                </Select>
            </div>
        );
    }
}
export default BlacklistWords;