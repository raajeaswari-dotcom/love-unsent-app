
const db = require('../models/index.js');

const getAllTestimonials = (req, res) => {
  res.json(db.testimonials);
};

const createTestimonial = (req, res) => {
  const { quote, author } = req.body;
  if (!quote || !author) {
    return res.status(400).json({ message: 'Quote and author are required.' });
  }
  const newTestimonial = {
    id: db.testimonials.length > 0 ? Math.max(...db.testimonials.map(t => t.id)) + 1 : 1,
    quote,
    author
  };
  db.testimonials.push(newTestimonial);
  res.status(201).json(newTestimonial);
};

const updateTestimonial = (req, res) => {
  const { id } = req.params;
  const { quote, author } = req.body;
  const testimonialIndex = db.testimonials.findIndex(t => t.id === parseInt(id));

  if (testimonialIndex === -1) {
    return res.status(404).json({ message: 'Testimonial not found.' });
  }
  
  if (!quote || !author) {
    return res.status(400).json({ message: 'Quote and author are required.' });
  }

  const updatedTestimonial = { ...db.testimonials[testimonialIndex], quote, author };
  db.testimonials[testimonialIndex] = updatedTestimonial;
  
  res.json(updatedTestimonial);
};

const deleteTestimonial = (req, res) => {
  const { id } = req.params;
  const testimonialIndex = db.testimonials.findIndex(t => t.id === parseInt(id));

  if (testimonialIndex === -1) {
    return res.status(404).json({ message: 'Testimonial not found.' });
  }

  db.testimonials.splice(testimonialIndex, 1);

  res.status(200).json({ message: 'Testimonial deleted successfully.' });
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};