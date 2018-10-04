import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import "./login.css";
import Auth from "../../services/auth";

const FormItem = Form.Item;

class Login extends Component {
  constructor() {
    super();
    this.auth = new Auth("https://dcordtroller-server.herokuapp.com/");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.auth
          .authUser("signin", values)
          .then(res => {
            this.auth.setToken(res.token);
            this.auth.authorize(res.token);
          })
          .then(res => this.props.history.replace("/main"))
          .catch(err => alert(err.message));
      }
    });
  };

  /*  componentWillMount() {
    if (this.auth.loggedIn()) {
      this.props.history.replace("/main");
    }
  }*/

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="logo">
            <h1>Dcordtroller</h1>
          </div>
          <FormItem className="username">
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
                onChange={this.handleChange}
              />
            )}
          </FormItem>
          <FormItem className="password">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </FormItem>
          <div className="register">
            <Link to="/register">Register</Link>
          </div>
          <div className="botinvite">
            <a
              target="_blank"
              href="https://discordapp.com/oauth2/authorize?client_id=486483177624305674&scope=bot&permissions=8"
            >
              Invite Bot
            </a>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
