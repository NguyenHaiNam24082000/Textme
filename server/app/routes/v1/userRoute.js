const express = require('express');
const router = express.Router();
const userController = require('../../controllers/User/userController');

router.get('/all-users',userController.allUser);

module.exports = router;