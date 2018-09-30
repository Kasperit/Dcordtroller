const jwt = require("jsonwebtoken");
const db = require("../models");

exports.signin = async function(req, res, next) {
  try {
    const user = await db.User.findOne({
      username: req.body.username
    });
    const { id, username, email } = user;
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id,
          username
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        email,
        token
      });
    }
    return next({
      status: 400,
      message: "Incorrect password!"
    });
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid username!"
    });
  }
};

exports.signup = async function(req, res, next) {
  try {
    const user = await db.User.create(req.body);
    const { id, username, email } = user;
    const token = jwt.sign(
      {
        id,
        username
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      email,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken!";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
