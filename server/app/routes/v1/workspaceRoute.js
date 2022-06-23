const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const workspaceController = require("../../controllers/Workspace/workspaceController");

router.post("/create", auth(), workspaceController.createServer);
router.get("/getAll", auth(), workspaceController.getAllWorkspaces);
router.post(
  "/:serverId/channel",
  auth(),
  workspaceController.createWorkspaceChannel
);
router.post("/:serverId/invite", auth(), workspaceController.inviteMember);
router.get("/discover", auth(), workspaceController.getDiscoverServers);
router.post(
  "/:serverId/join",
  auth(),
  workspaceController.sendJoinServerRequest
);
router.post(
  "/:serverId/cancelJoin",
  auth(),
  workspaceController.cancelJoinServerRequest
);
router.get(
  "/:serverId/allInvite",
  auth(),
  workspaceController.getAllInviteMembers
);
router.get(
  "/:serverId/allPending",
  auth(),
  workspaceController.getAllPendingMembers
);
router.get(
  "/:serverId/allBlocked",
  auth(),
  workspaceController.getAllBlockedMembers
);

module.exports = router;
