const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const botSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  }
  /*blackListWords: {
    type: [String],
    require: false
  }*/
});

const Bot = mongoose.model("Bot", botSchema);

module.exports = Bot;
