const express = require("express");

const router = express.Router();
const {
  createBot,
  getAllBot,
  getBot,
  deleteBot,
  patchBot
} = require("../handlers/bot");

router.post("/", createBot);
router.get("/", getAllBot);
router.get("/:bot_name", getBot);
router.delete("/:bot_name", deleteBot);
router.patch("/:bot_name", patchBot);

module.exports = router;
