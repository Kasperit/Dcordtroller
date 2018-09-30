import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Form, Icon, Input, Button } from 'antd';
import './login.css';

const FormItem = Form.Item;

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push('/main');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <h1>DCordtroller</h1>
            <FormItem className="username">
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem className="password">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </FormItem>
            <div className="register">
              <Link to="/register">Register</Link>
            </div>
            <div className="botinvite">
              <a target='_blank' href="https://discordapp.com/oauth2/authorize?client_id=486483177624305674&scope=bot&permissions=8">Invite Bot</a>
            </div>
          </Form>
        </div>
    );
  }
}

export default Form.create()(Login)