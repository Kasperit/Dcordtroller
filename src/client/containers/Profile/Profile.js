import React, { Component } from "react";
import { Button, Modal, Card, Avatar } from "antd";
import * as qs from "query-string";
import Discord from "../../services/discord";
import "./Profile.css";

const { confirm } = Modal;
const { Meta } = Card;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.discord = new Discord("https://dcordtroller-server.herokuapp.com/");
    this.state = {
      discordConnect: false,
      discordAccount: null,
      load: false
    };
  }

  showConfirm = () => {
    const handleDisconnect = () => this.handleDisconnect();
    confirm({
      title: "Do you want to disconnect with your Discord account?",
      content: "You can connect back later",
      onOk() {
        handleDisconnect();
      },
      onCancel() {}
    });
  };

  handleConnect = () => {
    window.location =
      "https://discordapp.com/oauth2/authorize?client_id=493788991380783106&response_type=code&scope=identify%20email%20guilds&redirect_uri=http://localhost:3000/main/user";
  };

  handleDisconnect = () => {
    this.discord
      .disconnect(this.props.user.username)
      .then(res => {
        console.log(res.message);
        this.setState({
          discordConnect: false,
          discordAccount: null
        });
      })
      .catch(err => console.log(err.message));
  };

  getProfile = async () => {
    await this.discord
      .getProfile(this.props.user.username)
      .then(res =>
        this.setState({
          discordConnect: true,
          discordAccount: res
        })
      )
      .then(res => console.log(this.state))
      .catch(err => console.log(err.message));
  };

  connect = async () => {
    const code = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).code;
    if (code && !this.state.discordConnect) {
      await this.discord
        .connect(
          this.props.user.username,
          code
        )
        .then(res => console.log(res.message))
        .then(res => this.getProfile())
        .catch(err => console.log(err.message));
    }
  };

  load = async () => {
    await this.getProfile();
    await this.connect();
    this.setState({ load: true });
  };

  componentWillMount() {
    this.load();
  }

  render() {
    if (!this.state.load)
      return (
        <div className="lds-css ng-scope">
          <div
            style={{ width: "100%", height: "100%" }}
            className="lds-double-ring"
          >
            <div />
            <div />
          </div>
        </div>
      );
    return (
      <div>
        <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
          Username: {this.props.user.username}
        </p>
        <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
          Email: {this.props.user.email}
        </p>
        {!this.state.discordConnect && (
          <Button className="dc-card-btn" onClick={() => this.handleConnect()}>
            Connect to your Discord account!
          </Button>
        )}
        {this.state.discordConnect && (
          <div>
            <Card className="dc-card">
              <Button
                className="dc-card-btn dc-disconnect-btn"
                onClick={() => this.showConfirm()}
              >
                Disconnect
              </Button>
              <Button className="dc-card-btn dc-invite-btn">
                <a
                  target="_blank"
                  href="https://discordapp.com/oauth2/authorize?client_id=486483177624305674&scope=bot&permissions=8"
                >
                  Invite Bot
                </a>
              </Button>
              <Meta
                avatar={
                  <Avatar
                    className="dc-card-avatar"
                    src={
                      this.state.discordAccount.avatar
                        ? `https://cdn.discordapp.com/avatars/${
                            this.state.discordAccount.id
                          }/${this.state.discordAccount.avatar}.png?size=128`
                        : `https://cdn.discordapp.com/embed/avatars/${this.state
                            .discordAccount.discriminator % 5}.png`
                    }
                  />
                }
                description={
                  <div>
                    <h5 className="dc-card-title">USERNAME</h5>
                    <h3 className="dc-card-username">
                      {`${this.state.discordAccount.username}#${
                        this.state.discordAccount.discriminator
                      }`}
                    </h3>
                    <h5 className="dc-card-title">JOINED SERVERS</h5>
                    <ul className="dc-card-list">
                      {this.state.discordAccount.guilds.map((guide, i) => (
                        <li key={i}>{guide.name}</li>
                      ))}
                    </ul>
                  </div>
                }
              />
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
