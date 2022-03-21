const channelController = require("../../controllers/Channel/channelController");
const express = require("express");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/get-or-create", auth(), channelController.getOrCreateDMChannel);
router.get("/get-all-DM-channels", auth(), channelController.getDMChannels);
router.get(
  "/get-all-group-channels",
  auth(),
  channelController.getGroupChannels
);

module.exports = router;
