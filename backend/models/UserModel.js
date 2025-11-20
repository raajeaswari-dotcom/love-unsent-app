
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    flat: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
}, {_id: false});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional, for guest vs registered
  isAdmin: { type: Boolean, required: true, default: false },
  mobile: { type: String },
  address: addressSchema,
  notes: { type: String },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      ret.joinedDate = doc.createdAt.toLocaleDateString();
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      delete ret.createdAt;
      delete ret.updatedAt;
    }
  },
  toObject: {
    virtuals: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
