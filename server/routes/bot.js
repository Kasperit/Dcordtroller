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
router.get("/:bot_id", getBot);
router.delete("/:bot_id", deleteBot);
router.patch("/:bot_id", patchBot);

module.exports = router;
