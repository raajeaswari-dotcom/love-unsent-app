const express = require('express');
const router = express.Router();

const { loginAdmin, getDashboardData } = require('../controllers/adminController.js');
const { verifyAdminToken } = require('../middleware/verifyAdminToken.js');

// POST /api/admin/login
router.post('/login', loginAdmin);

// GET /api/admin/dashboard-data (protected)
router.get('/dashboard-data', verifyAdminToken, getDashboardData);

module.exports = router;
