const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  discordTag: {
    type: String,
    required: false,
  },
});

userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.method.comparePassword = async function(candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model('User', userSchema);

const doc = new User({
    email: "sabc@xyz.ssll",
    username: "aaraall",
    password: "ssssss"
  });

User.init()
    .then(() => User.create(doc));

/*User.create(
  {
    email: "abc@xyz.ss",
    username: "aaaa",
    password: "ssssss"
  }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log("new user" + user);
    }
  }
);*/

module.exports = User;
