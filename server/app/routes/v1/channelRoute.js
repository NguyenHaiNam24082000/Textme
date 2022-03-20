const channelController = require("../../controllers/Channel/channelController");
const express = require("express");

const router = express.Router();

router.post("/get-or-create", auth(),channelController.getOrCreateDMChannel);
