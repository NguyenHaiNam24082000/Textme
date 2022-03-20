const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/User/userController');

router.get('/all-users',userController.allUsers);
// router.get('/get-users',auth("getUsers"),userController.getUsers);
router.get('/get-users',auth(),userController.getUsers);

module.exports = router;