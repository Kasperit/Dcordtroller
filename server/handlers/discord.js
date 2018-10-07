const axios = require("axios");
const btoa = require("btoa");

const CLIENT_ID = process.env.CLIENT_ID || "493788991380783106";
const CLIENT_SECRET =
  process.env.CLIENT_SECRET || "Dg_LwDyFgwjNY5QUc-GobCwkIIUmKmin";
const redirect = encodeURIComponent(
  /*"https://dcordtroller-server.herokuapp.com/api/discord/connect"*/
  "http://localhost:8081/api/discord/connect"
);

exports.connect = async function(req, res, next) {
  try {
    if (!req.query.code) {
      next({
        status: 400,
        message: "No code provided, connection failed!"
      });
      res.redirect("http://localhost:3000/main");
    }
    const code = req.query.code;
    const url = `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`;
    const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const config = {
      headers: {
        Authorization: `Basic ${creds}`
      }
    };
    const response = await axios.post(url, null, config);
    const user = await axios.get("http://discordapp.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`
      }
    });

    return res.status(200).json(user.data);
  } catch (err) {
    return next(err);
  }
};
