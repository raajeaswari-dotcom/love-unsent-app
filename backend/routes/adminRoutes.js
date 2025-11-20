
const express = require('express');
const router = express.Router();
const { loginAdmin, getDashboardData } = require('../controllers/adminController.js');
const { verifyAdminToken } = require('../middleware/verifyAdminToken.js');

router.post('/login', loginAdmin);
router.get('/dashboard-data', verifyAdminToken, getDashboardData);

module.exports = router;