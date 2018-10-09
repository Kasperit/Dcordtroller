import React, { Component } from "react";
import { Form, Input, Button, Icon, Modal } from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./register.css";
import Auth from "../../services/auth";

const FormItem = Form.Item;

class Register extends Component {
  constructor() {
    super();
    this.auth = new Auth("https://dcordtroller-server.herokuapp.com/");
    this.state = {
      confirmDirty: false
    };
  }

  success = message => {
    Modal.success({
      title: `${message}`
    });
  };

  error = message => {
    Modal.error({
      title: `${message}`
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { username, email, password } = values;
        const data = { username, email, password };
        this.auth
          .authUser("signup", data)
          .then(res => this.success(res.message))
          .then(res => this.props.history.replace("/"))
          .catch(err => this.error(err.message));
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="black-background" />
        <div className="login-logo">
          <h1>Dcordtroller</h1>
        </div>
        <Form onSubmit={this.handleSubmit} className="register-form">
          <h1 className="welcome">Join us now!</h1>
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
            <h5 className="login-field-name">USERNAME</h5>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your email!" }]
            })(
              <Input
                type="email"
                className="login-input"
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="example@example.com"
                onChange={this.handleChange}
              />
            )}
          </FormItem>
          <FormItem className="login-field">
            <h5 className="login-field-name">PASSWORD</h5>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your password!" },
                { validator: this.validateToNextPassword }
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
          <FormItem className="login-field">
            <h5 className="login-field-name">CONFIRM PASSWORD</h5>
            {getFieldDecorator("confirm", {
              rules: [
                { required: true, message: "Please confirm your password!" },
                { validator: this.compareToFirstPassword }
              ]
            })(
              <Input
                className="login-input"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Confirm password"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </FormItem>
          <FormItem className="login-btn">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign me up
            </Button>
          </FormItem>
          <div className="register">
            Had an account already?{" "}
            <Link className="login-link" to="/">
              Login
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);
