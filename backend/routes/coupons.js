
const express = require('express');
const router = express.Router();
const { getAllCoupons } = require('../controllers/couponsController.js');

router.get('/', getAllCoupons);

module.exports = router;