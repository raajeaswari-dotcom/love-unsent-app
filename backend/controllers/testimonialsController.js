
const Testimonial = require('../models/TestimonialModel.js');

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({});
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createTestimonial = async (req, res) => {
  const { quote, author } = req.body;
  if (!quote || !author) {
    return res.status(400).json({ message: 'Quote and author are required.' });
  }
  
  try {
    const testimonial = new Testimonial({ quote, author });
    const createdTestimonial = await testimonial.save();
    res.status(201).json(createdTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateTestimonial = async (req, res) => {
  const { quote, author } = req.body;
  
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      testimonial.quote = quote || testimonial.quote;
      testimonial.author = author || testimonial.author;

      const updatedTestimonial = await testimonial.save();
      res.json(updatedTestimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      await testimonial.deleteOne();
      res.json({ message: 'Testimonial removed' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
