
const express = require('express');
const router = express.Router();
const { getAllOrders } = require('../controllers/ordersController');

router.get('/', getAllOrders);

module.exports = router;
