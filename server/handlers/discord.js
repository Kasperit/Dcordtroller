const axios = require("axios");
const btoa = require("btoa");
const db = require("../models");

const CLIENT_ID = process.env.CLIENT_ID || "493788991380783106";
const CLIENT_SECRET =
  process.env.CLIENT_SECRET || "Dg_LwDyFgwjNY5QUc-GobCwkIIUmKmin";
const redirect = encodeURIComponent(
  /*"https://dcordtroller-server.herokuapp.com/api/discord/connect"*/
  /*"http://localhost:8081/api/discord/connect"*/
  "http://localhost:3000/main/user"
);

exports.connect = async function(req, res, next) {
  try {
    if (!req.body.code) {
      next({
        status: 400,
        message: "No code provided, connection failed!"
      });
    }
    const user = await db.User.findOne({
      username: req.params.username
    });
    const code = req.body.code;
    const url = `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`;
    const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const config = {
      headers: {
        Authorization: `Basic ${creds}`
      }
    };
    const isConnect = await axios
      .post(url, null, config)
      .then(res => {
        user.discord.access_token = res.data.access_token;
        user.discord.refresh_token = res.data.refresh_token;
      })
      .then(res => user.save())
      .then(res => {
        return true;
      })
      .catch(err => {
        return false;
      });
    if (isConnect) {
      res.status(200).json({ message: "Well done! Connect successfully!" });
    }
    return next({
      status: 400,
      message: "Invalid code, connection failed!"
    });
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid request!"
    });
  }
};

exports.getDiscord = async function(req, res, next) {
  try {
    const user = await db.User.findOne({
      username: req.params.username
    });
    if (user.discord.access_token) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.discord.access_token}`
        }
      };
      const userDiscord = await axios.get(
        "http://discordapp.com/api/users/@me",
        config
      );
      const guilds = await axios
        .get("http://discordapp.com/api/users/@me/guilds", config)
        .then(res => {
          return res.data;
        });
      return res.status(200).json({ ...userDiscord.data, guilds });
    } else {
      return next({
        status: 400,
        message: "Not connected yet!"
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.disconnect = async function(req, res, next) {
  try {
    const user = await db.User.findOne({
      username: req.params.username
    });
    user.discord.access_token = undefined;
    user.discord.refresh_token = undefined;
    user.save();
    return res.status(200).json({ message: "Disconnected!" });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};
