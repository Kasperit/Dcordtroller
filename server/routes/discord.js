const express = require("express");

const router = express.Router();
const { connect, getDiscord } = require("../handlers/discord");

router.post("/:username", connect);
router.get("/:username", getDiscord);

module.exports = router;
