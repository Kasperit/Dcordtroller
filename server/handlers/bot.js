const db = require("../models");

exports.createBot = async function(req, res, next) {
  try {
    const bot = await db.Bot.create(req.body);
    const { id, name, blackListWords } = bot;
    return res.status(200).json({
      id,
      name,
      blackListWords
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

exports.getAllBot = async function(req, res, next) {
  try {
    const bot = await db.Bot.find();
    return res.status(200).json(bot);
  } catch (err) {
    return next(err);
  }
};

exports.getBot = async function(req, res, next) {
  try {
    const bot = await db.Bot.findOne({
      name: req.params.bot_name
    });
    return res.status(200).json(bot);
  } catch (err) {
    return next(err);
  }
};

exports.deleteBot = async function(req, res, next) {
  try {
    const bot = await db.Bot.findOne({
      name: req.params.bot_name
    });
    await bot.remove();
    return res.status(200).json(bot);
  } catch (err) {
    return next(err);
  }
};

exports.patchBot = async function(req, res, next) {
  try {
    const bot = await db.Bot.findOne({
      name: req.params.bot_name
    });
    if (req.body._id) {
      delete req.body._id;
    }
    Object.keys(req.body).map(key => (bot[key] = req.body[key]));
    bot.save();
    return res.status(200).json(bot);
  } catch (err) {
    return next(err);
  }
};
