const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true
  }
);

module.exports.User = require("./user");
module.exports.Bot = require("./bot");
