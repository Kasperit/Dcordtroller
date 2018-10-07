import React, { Component } from "react";
import { Button } from "antd";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    console.log("click");
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
          Username: {this.props.user.username}
        </p>
        <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
          Email: {this.props.user.email}
        </p>
        <Button onClick={() => this.handleClick()}>
          Connect to your Discord account!
        </Button>
      </div>
    );
  }
}

export default Profile;
