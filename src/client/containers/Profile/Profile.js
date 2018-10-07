import React, { Component } from "react";
import { Button } from "antd";
import * as qs from "query-string";
import Discord from "../../services/discord";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.discord = new Discord();
    this.state = {
      discordConnect: false,
      discordAccount: null
    };
  }

  handleClick = () => {
    window.location =
      "https://discordapp.com/oauth2/authorize?client_id=493788991380783106&response_type=code&scope=identify%20email%20guilds&redirect_uri=http://localhost:3000/main/user";
  };

  componentDidMount() {
    const code = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).code;
    console.log(code);
    if (code) {
      this.discord
        .connect(
          this.props.user.username,
          code
        )
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

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
