
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
