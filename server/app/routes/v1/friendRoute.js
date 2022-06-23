const express = require("express");
const auth = require("../../middlewares/auth");
const friendsController = require("../../controllers/Friend/friendController");
const validate = require("../../middlewares/validate");
const validations = require("../../controllers/Friend/validations/friendValidation");
const router = express.Router();

router.post('/add-friend-request', auth(), validate(validations.createFriendRequest), friendsController.createFriendRequest);
router.get('/pending-requests', auth(), friendsController.getPendingRequests);
router.get('/outgoing-requests', auth(), friendsController.outGoingRequests);
router.patch('/cancel-pending-request', auth(), friendsController.cancelPendingRequest);
router.patch('/accept-pending-request', auth(), friendsController.acceptPendingRequest);
router.get('/all-friends', auth(), friendsController.getAllFriends);
router.patch('/block-friend', auth(), friendsController.blockFriendRequest);
router.get('/all-blocked-friends', auth(), friendsController.getAllBlockedFriends);
router.patch('/unblock-friend', auth(), friendsController.unblockFriendRequest);

module.exports = router;
