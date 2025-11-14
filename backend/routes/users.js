
const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/usersController.js');

router.get('/', getAllUsers);

module.exports = router;