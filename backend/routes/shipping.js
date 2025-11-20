
const express = require('express');
const router = express.Router();
const { checkPincode } = require('../controllers/shippingController.js');

router.get('/check/:pincode', checkPincode);

module.exports = router;