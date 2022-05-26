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

module.exports = router;
