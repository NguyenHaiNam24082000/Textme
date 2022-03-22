const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const messageController = require("../../controllers/Message/messageController");

router.post("/send-message", auth(),messageController.sendMessage);
router.get("/:channelId", auth(),messageController.getMessages);

module.exports = router;