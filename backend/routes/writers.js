
const express = require('express');
const router = express.Router();
const { getAllWriters } = require('../controllers/writersController');

router.get('/', getAllWriters);

module.exports = router;
