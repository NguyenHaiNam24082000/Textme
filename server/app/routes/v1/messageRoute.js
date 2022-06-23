const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../../middlewares/auth");
const messageController = require("../../controllers/Message/messageController");
const { uploadFile } = require("../../configs/storage");

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/send-message",
  auth(),
  Multer.any(10),
  uploadFile,
  messageController.sendMessage
);
router.get("/:channelId", auth(), messageController.getMessages);
router.get("/:channelId/search", auth(), messageController.searchMessages);
router.put("/edit-message/:messageId", auth(), messageController.editMessage);
router.post("/post-link", messageController.postLink);
router.delete(
  "/delete-message/:messageId",
  auth(),
  messageController.deleteMessage
);
router.get("/translate/:messageId", auth(), messageController.translateMessage);

module.exports = router;
