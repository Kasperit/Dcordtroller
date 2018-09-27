const mongoose = require("mongoose");
const Bot = require("./bot");

mongoose.set("useCreateIndex", true);

const blwSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true
  },
  bot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bot"
  }
});

blwSchema.pre("remove", async function(next) {
  try {
    let bot = await Bot.findById(this.bot);
    bot.blackListWords.remove(this.id);
    await bot.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const BlackListWord = mongoose.model("BlackListWord", blwSchema);

module.exports = BlackListWord;
