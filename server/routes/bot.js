const express = require("express");

const router = express.Router();
const { createBot } = require("../handlers/bot");

router.post("/createbot", createBot);

module.exports = router;
