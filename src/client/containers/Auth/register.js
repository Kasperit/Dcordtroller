import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import "./register.css";

const FormItem = Form.Item;

class Register extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.history.push("/");
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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="form">
        <Form onSubmit={this.handleSubmit} className="register-form">
          <div className="logo">
            <h1>Join Dcordtroller today!</h1>
          </div>
          <FormItem
            {...formItemLayout}
            label="Username"
            className="usernameregister"
          >
            {getFieldDecorator("userName", {
              rules: [
                {
                  required: true,
                  message: "Please input your username!"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Email" className="email">
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Please input your email!"
                }
              ]
            })(<Input type="email" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
            className="passwordregister"
          >
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Confirm Password"
            className="confirm"
          >
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);
