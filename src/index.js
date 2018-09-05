import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function bmi(height, weight) {
  function toMeters(height) {
    return height / 100;
  }
  return weight / Math.pow(toMeters(height), 2);
}
//  NDg2NDgzMTc3NjI0MzA1Njc0.Dm_6zQ.fFeSs52kM1lXtZcMMTQXV_iWeTs

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
    });

    client.on('message', msg => {
      this.handleChangeWeight(msg);
    });

    client.login('NDQ2NzMwNjc0NDgxOTIyMDQ4.DmADgQ.J0iFCkHQ2ENCft8WMKJNXjRzZgE');

    const Discord1 = require('discord.js');
    const client1 = new Discord1.Client();

    client1.on('ready', () => {
      console.log(`Logged in as ${client1.user.tag}!`);
    });

    client1.on('message', msg => {
      this.handleChangeWeight(msg);
    });

    client1.login('NDg2NDgzMTc3NjI0MzA1Njc0.DnEGnA.0e9GJA_nkFkXLTbxePjfaqkrNIM');

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
          Height:
          <input type="text" value={this.state.height} onChange={this.handleChangeHeight} />
        </label>
        <br>
        </br>
        <img src={this.state.url} alt="Girl in a jacket"></img>
        <label>
          Weight:
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

