const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb+srv://admin:dcordtroller@dcordtroller-s83ph.mongodb.net/test?retryWrites=true", {
  keepALive: true,
  useMongoClient: true
});
