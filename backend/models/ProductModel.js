
const mongoose = require('mongoose');

const productAttributeOptionSchema = new mongoose.Schema({
  value: { type: String, required: true },
  priceModifier: { type: Number, default: 0 },
}, {_id: false});

const productAttributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [productAttributeOptionSchema],
}, {_id: false});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  gstRate: {
    type: Number,
    default: 0,
  },
  hsnCode: {
    type: String,
  },
  attributes: [productAttributeSchema],
  availablePaperTypeIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaperType',
  }],
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
