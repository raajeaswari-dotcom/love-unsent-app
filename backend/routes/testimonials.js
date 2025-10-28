
const express = require('express');
const router = express.Router();
const { getAllTestimonials } = require('../controllers/testimonialsController');

router.get('/', getAllTestimonials);

module.exports = router;
