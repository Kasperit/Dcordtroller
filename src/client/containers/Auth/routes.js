import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter,Link,Route} from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd';
import './login.css';
import Register from './register'

const FormItem = Form.Item;

const Routes = () => (
    <BrowserRouter>
    <div>
        <div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
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
          </Form>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <a target='_blank' href="https://discordapp.com/oauth2/authorize?client_id=486483177624305674&scope=bot&permissions=8">Invite Bot</a>
        </div>
      </div>
      <Route path="/register" component={Register} />
    </BrowserRouter>
);

export default Routes;