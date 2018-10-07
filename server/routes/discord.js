const express = require("express");

const router = express.Router();
const { connect } = require("../handlers/discord");

router.get("/connect", connect);

module.exports = router;
