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
router.get(
  "/get-existing-group-channels",
  auth(),
  channelController.getExistingGroupChannels
);
router.post(
  "/create-group-channel",
  auth(),
  channelController.createGroupChannel
);
router.get("/:channelId/pins", auth(), channelController.getPinnedMessage);
router.put(
  "/:channelId/pins/:messageId",
  auth(),
  channelController.pinnedMessage
);
router.put(
  "/:channelId/reactions/:messageId",
  auth(),
  channelController.reactionMessage
);
router.put(
  "/:channelId/invite",
  auth(),
  channelController.inviteMembersToChannel
);

module.exports = router;
