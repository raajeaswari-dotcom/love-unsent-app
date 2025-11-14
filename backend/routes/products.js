
const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productsController.js');

router.get('/', getAllProducts);

module.exports = router;