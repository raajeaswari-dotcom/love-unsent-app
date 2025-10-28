
const { testimonials } = require('../models/data');

const getAllTestimonials = (req, res) => {
  res.json(testimonials);
};

module.exports = {
  getAllTestimonials,
};
