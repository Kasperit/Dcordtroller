require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const botRoutes = require("./routes/bot");
const discordRoutes = require("./routes/discord");
const { loginRequired, ensureCorrectUSer } = require("./middleware/auth");

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/bot", botRoutes);
app.use("/api/discord", discordRoutes);

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
