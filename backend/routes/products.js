
const express = require('express');
const router = express.Router();
const { getAllProducts, updateProduct } = require('../controllers/productsController.js');
const verifyAdminToken = require('../middleware/verifyAdminToken.js');


router.get('/', getAllProducts);
router.put('/:id', verifyAdminToken, updateProduct);

module.exports = router;
