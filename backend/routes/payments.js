
const express = require('express');
const router = express.Router();
const { getAllPaymentMethods } = require('../controllers/paymentsController.js');

router.get('/', getAllPaymentMethods);

module.exports = router;