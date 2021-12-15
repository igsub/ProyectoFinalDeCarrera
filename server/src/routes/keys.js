const express = require('express');

const GooglemapController = require('../controllers/googlemap');

const router = express.Router();

//Routes
router.get('/googlemap', GooglemapController.getGoogleMap);

module.exports = router;