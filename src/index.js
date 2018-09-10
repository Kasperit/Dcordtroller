import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class BmiForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: '',
      weight: '',
      url: ''
    };

    this.handleChangeHeight = this.handleChangeHeight.bind(this);
    this.handleChangeWeight = this.handleChangeWeight.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const Discord = require('discord.js');
    const client = new Discord.Client();

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
      for (let index = 0; index < client.guilds.array().length; index++) {
        //console.log(client.guilds.array()[index].name);
        for (let x = 0; x < client.guilds.array()[index].members.array().length; x++) {
          //console.log(client.guilds.array()[index].members.array()[x].hasPermission("ADMINISTRATOR"));
          if (client.guilds.array()[index].members.array()[x].hasPermission("ADMINISTRATOR") == true) {
            console.log("admin:")
            console.log(client.guilds.array()[index].members.array()[x].user.tag);
          }
          if (client.guilds.array()[index].members.array()[x].user.tag == 'Tadaaz#7096') {
            console.log("would have been kicked");
            //client.guilds.array()[index].members.array()[x].kick();
          }
        }
        console.log("change server");
      }
    });

    client.on("guildCreate", guild => {
      console.log("Joined a new guild:: " + guild.name);

      console.log(guild.channel.id);
      //Your other stuff like adding to guildArray
    });

    client.on('message', msg => {
      this.handleChangeWeight(msg);
      //client.channels.get("id", client.channels.get("name", "general").id).sendMessage("Testing");
    });

    client.login('NDg2NDgzMTc3NjI0MzA1Njc0.DnEGnA.0e9GJA_nkFkXLTbxePjfaqkrNIM');

  }

  handleChangeHeight(event) {
    this.setState({ height: event.target.value });
    //client.channels.get("448847115620450314").send();
  }

  handleChangeWeight(event) {
    //this.setState({weight: event.target.value});
    this.setState({ weight: `${event.author.username}` + ": " + event.content });
    this.setState({ url: event.author.avatarURL});

    //client.channels.get("448847115620450314").send('My Message');
  }

  handleSubmit(event) {
    //alert("BMI: " + bmi(this.state.height,this.state.weight));
    //client.channels.get("test").send('My Message');
    //client.login(this.state.weight);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.height} onChange={this.handleChangeHeight} />
        </label>
        <br>
        </br>
        <img src={this.state.url}></img>
        <label>
          <input type="text" value={this.state.weight} onChange={this.handleChangeWeight} id="asd" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// ========================================

ReactDOM.render(
  <BmiForm />,
  document.getElementById('root')
);

