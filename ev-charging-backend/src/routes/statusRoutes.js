const express = require('express');
const StatusController = require('../controllers/StatusController');
const authenticateToken = require('../auth');
const router = express.Router();

router.get('/', authenticateToken, StatusController.getStatus);

module.exports = router;
