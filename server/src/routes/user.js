const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUser/:user_id', UserController.getUser);
router.post('/addUser', UserController.addUser);
router.put('/getUser/:user_id', UserController.updateUser);
router.delete('/getUser/:user_id', UserController.deleteUser);

module.exports = router;