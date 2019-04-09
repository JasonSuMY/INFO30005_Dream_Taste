const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

// Load the main page.
router.get('/', controllers.loadMainPage);

module.exports = router;