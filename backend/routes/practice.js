const express = require('express');

const practiceController = require('../controllers/practice.js');

const router = express.Router();

router.get('/', practiceController.getData);

module.exports = router;

