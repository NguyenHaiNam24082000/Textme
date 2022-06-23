const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const userController = require("../../controllers/User/userController");
const { uploadAvatar } = require("../../configs/storage");
const multer = require("multer");

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/all-users", userController.allUsers);
// router.get('/get-users',auth("getUsers"),userController.getUsers);
router.get("/get-users", auth(), userController.getUsers);
router.get("/:id/mutual", auth(), userController.getMutual);
router.get("/:id/me", auth(), userController.getUserById);
router.put(
  "/:id/me",
  auth(),
  Multer.any(1),
  uploadAvatar,
  userController.editUserById
);
router.get("/invites", auth(), userController.getAllInviteServers);

module.exports = router;
