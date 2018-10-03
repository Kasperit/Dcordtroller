import React, { Component } from "react";
import Auth from "../services/auth";

export default function withAuth(AuthComponent) {
  return class Authenticate extends Component {
    constructor() {
      super();
      this.auth = new Auth("https://dcordtroller-server.herokuapp.com/");
      this.state = {
        user: null
      };
    }

    componentWillMount() {
      if (!this.auth.loggedIn()) {
        this.props.history.replace("/");
      } else {
        try {
          const profile = this.auth.getProfile();
          console.log(profile);
          this.setState({
            user: profile
          });
        } catch (err) {
          this.auth.logout();
          this.props.history.replace("/");
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent
            {...this.props}
            history={this.props.history}
            user={this.state.user}
          />
        );
      } else {
        return null;
      }
    }
  };
}
