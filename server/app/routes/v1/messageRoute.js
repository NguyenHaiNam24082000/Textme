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
router.post("/post-link",messageController.postLink);
router.delete("/delete-message/:messageId", auth(), messageController.deleteMessage);
router.get("/translate/:messageId", auth(), messageController.translateMessage);

module.exports = router;
