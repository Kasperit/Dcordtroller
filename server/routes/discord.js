const express = require("express");

const router = express.Router();
const { connect, getDiscord, disconnect } = require("../handlers/discord");

router.post("/:username/connect", connect);
router.get("/:username", getDiscord);
router.post("/:username/disconnect", disconnect);

module.exports = router;
