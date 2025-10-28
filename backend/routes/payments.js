
const express = require('express');
const router = express.Router();
const { getAllPaymentMethods } = require('../controllers/paymentsController');

router.get('/', getAllPaymentMethods);

module.exports = router;
