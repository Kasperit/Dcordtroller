import React, { Fragment, Component } from "react";
import { Col, Row } from "antd";
import ListServer from "../../components/ListServer/ListServer";
import ListVoiceChannel from "../../components/ListVoiceChannel/ListVoiceChannel";

class ListChannelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: null,
      listOfGuilds: this.props.listOfGuilds
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !(this.state.server === nextState.server) ||
      this.state.listOfGuilds !== nextState.listOfGuilds
    );
  }

  handlePlayMusic = item => {
    let voiceChannelName = item.item.name; // XD
    let serverName = item.server;
    let url = item.url;
    console.log(url);

    let listOfGuilds = [...this.state.listOfGuilds];
    for (let i = 0; i < listOfGuilds.length; i++) {
      if (listOfGuilds[i].server === serverName) {
        let generalObject = listOfGuilds[i].serverObject.channels.array()[1];
        generalObject.send(
          "!" + voiceChannelName + ";" + serverName + ";" + "<" + url + ">"
        );
      }
    }
  };

  render() {
    let { listOfGuilds, server } = this.state;
    let listOfVoice = null;
    let listServer = [];
    if (server) {
      listOfVoice = (
        <ListVoiceChannel
          listOfGuilds={listOfGuilds}
          server={server}
          handlePlayMusic={server => this.handlePlayMusic(server)}
          closeUserList={() => this.setState({ server: null })}
        />
      );
    }
    for (let i = 0; i < listOfGuilds.length; i++) {
      listServer.push(listOfGuilds[i].server);
    }
    return (
      <Fragment>
        <Row style={{ height: "100%" }}>
          <ListServer
            listServer={listServer}
            server={server}
            chooseServer={server => this.setState({ server })}
          />
          {listOfVoice}
        </Row>
      </Fragment>
    );
  }
}

export default ListChannelContainer;
