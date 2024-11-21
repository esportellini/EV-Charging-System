const express = require('express');
const PreferencesController = require('../controllers/PreferencesController');
const authenticateToken = require('../auth');
const router = express.Router();

router.get('/', authenticateToken, PreferencesController.getPreferences);
router.put('/', authenticateToken, PreferencesController.updatePreferences);

module.exports = router;
