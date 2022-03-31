const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../../middlewares/auth");
const upload = multer();
const messageController = require("../../controllers/Message/messageController");

router.post(
  "/send-message",
  auth(),
  upload.none(),
  messageController.sendMessage
);
router.get("/:channelId", auth(), messageController.getMessages);
router.get("/:channelId/search", auth(), messageController.searchMessages);
router.put("/edit-message/:messageId", auth(), messageController.editMessage);
router.put(
  "/:channelId/pins/:messageId",
  auth(),
  messageController.pinnedMessage
);

module.exports = router;
