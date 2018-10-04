const jwt = require('jsonwebtoken');
const db = require('../models');

exports.signin = async function (req, res, next) {
  try {
    const user = await db.User.findOne({
      username: req.body.username,
    });
    const { id, username, email } = user;
    const userInfo = { id, username, email };
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const token = jwt.sign({ ...userInfo }, process.env.SECRET_KEY);
      return res.status(200).json({ token });
    }
    return next({
      status: 400,
      message: 'Incorrect password!',
    });
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid username!',
    });
  }
};

exports.signup = async function (req, res, next) {
  try {
    const user = await db.User.create(req.body);
    const { id, username, email } = user;
    const userInfo = { id, username, email };
    const token = jwt.sign({ ...userInfo }, process.env.SECRET_KEY);
    return res.status(200).json({
      message: 'Register successfully!\nGo to login!',
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is taken!';
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};
