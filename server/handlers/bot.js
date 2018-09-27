const db = require("../models");

exports.createBot = async function(req, res, next) {
  try {
    const bot = await db.Bot.create(req.body);
    const { id, name } = bot;
    return res.status(200).json({
      id,
      name
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, use another name!";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
