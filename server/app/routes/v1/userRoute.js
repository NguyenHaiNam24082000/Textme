const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const userController = require("../../controllers/User/userController");

router.get("/all-users", userController.allUsers);
// router.get('/get-users',auth("getUsers"),userController.getUsers);
router.get("/get-users", auth(), userController.getUsers);
router.get("/:id/mutual", auth(), userController.getMutual);
router.get("/:id", auth(), userController.getUserById);
router.put("/:id", auth(), userController.editUserById);
router.get("/:id/invite-servers", auth(), userController.getAllInviteServers);

module.exports = router;
