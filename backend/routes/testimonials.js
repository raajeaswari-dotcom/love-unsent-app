
const express = require('express');
const router = express.Router();
const { 
    getAllTestimonials, 
    createTestimonial, 
    updateTestimonial, 
    deleteTestimonial 
} = require('../controllers/testimonialsController.js');
const { verifyAdminToken } = require('../middleware/verifyAdminToken.js');

router.get('/', getAllTestimonials);
router.post('/', verifyAdminToken, createTestimonial);
router.put('/:id', verifyAdminToken, updateTestimonial);
router.delete('/:id', verifyAdminToken, deleteTestimonial);

module.exports = router;