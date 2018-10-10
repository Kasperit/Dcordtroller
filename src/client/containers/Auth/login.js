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

  componentWillMount() {
    if (this.auth.loggedIn()) {
      this.props.history.replace("/main");
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="black-background" />
        <div className="login-logo">
          <h1>Dcordtroller</h1>
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h1 className="welcome">Welcome back!</h1>
          <FormItem className="login-field">
            <h5 className="login-field-name">USERNAME</h5>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                className="login-input"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
                onChange={this.handleChange}
              />
            )}
          </FormItem>
          <FormItem className="login-field">
            <h5 className="login-field-name">PASSWORD</h5>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your password!" }
              ]
            })(
              <Input
                className="login-input"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            )}
          </FormItem>
          <FormItem className="login-btn">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Login
            </Button>
          </FormItem>
          <div className="register">
            Need an account?{" "}
            <Link className="login-link" to="/register">
              Register
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
