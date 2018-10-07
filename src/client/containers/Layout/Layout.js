import React, { Component } from "react";
import HeaderBar from "../../components/Navigation/Header/Header";
import FooterBar from "../../components/Navigation/Footer/footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ListUserAndServerContainer from "../ListUser/ListUserAndServerContainers";
import UpdateBlocker from "../UpdateBlocker";
import ContentWeb from "./Content";
import ListVoiceChannelsContainer from "../ListVoiceChannels/ListVoiceChannelsContainers";
import BotConfigContainer from "../Bot/BotConfig/BotConfigContainer";
import Profile from "../Profile/Profile";

class Layout extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.location.pathname !== nextProps.location.pathname;
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <div className="App">
          <UpdateBlocker>
            <HeaderBar {...this.props} />
          </UpdateBlocker>
          <Switch>
            <Route
              key={window.location.href}
              path={`${this.props.match.url}/servers`}
              render={props => (
                <ContentWeb {...props} title="Servers">
                  <ListUserAndServerContainer
                    infoFromDiscord={this.props.infoFromDiscord}
                    msg={this.props.msg}
                    {...props}
                  />
                </ContentWeb>
              )}
            />
            <Route
              key={window.location.href}
              path={`${this.props.match.url}/soundboard`}
              render={props => (
                <ContentWeb {...props} title="Servers">
                  <ListVoiceChannelsContainer
                    infoFromDiscord={this.props.infoFromDiscord}
                    msg={this.props.msg}
                    {...props}
                  />
                </ContentWeb>
              )}
            />
            <Route
              key={window.location.href}
              path={`${this.props.match.url}/bot`}
              render={props => (
                <ContentWeb {...props} title="Bot Configuration">
                  <BotConfigContainer
                    infoFromDiscord={this.props.infoFromDiscord}
                    client={this.props.client}
                    newListOfBannedWords={listOfBannedWords =>
                      this.props.newListOfBannedWords(listOfBannedWords)
                    }
                    listOfBannedWords={this.props.listOfBannedWords}
                    {...props}
                  />
                </ContentWeb>
              )}
            />
            <Route
              key={window.location.href}
              path={`${this.props.match.url}/user`}
              render={props => (
                <ContentWeb {...props} title="Profile">
                  <Profile {...props} user={this.props.user} />
                </ContentWeb>
              )}
            />
          </Switch>
          <UpdateBlocker>
            <FooterBar />
          </UpdateBlocker>
        </div>
      </div>
    );
  }
}

export default Layout;
