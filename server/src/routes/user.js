const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.post('/login', UserController.login);
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUser/:user_id', UserController.getUser);
router.post('/addUser', UserController.addUser);
router.put('/getUser/:user_id', UserController.updateUser);
router.delete('/getUser/:user_id', UserController.deleteUser);
router.post('/addUserMeeting', UserController.addUserMeeting);
router.get('/getAllUserMeetings', UserController.getAllUserMeetings);

module.exports = router;