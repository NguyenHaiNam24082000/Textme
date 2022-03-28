const express = require('express');
const authRoute = require('./v1/authRoute');
const userRoute = require('./v1/userRoute');
const friendRoute = require('./v1/friendRoute');
const channelRoute = require('./v1/channelRoute');
const messageRoute = require('./v1/messageRoute');
// const postRoute = require('./postRoute');
// const commentRoute = require('./commentRoute');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/friend', friendRoute);
router.use('/channel', channelRoute);
router.use('/messages', messageRoute);

module.exports = router;