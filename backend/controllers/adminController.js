const Admin = require('../models/AdminModel.js');
const generateToken = require('../utils/generateToken.js');

// Import Models
const Product = require('../models/ProductModel.js');
const User = require('../models/UserModel.js');
const Testimonial = require('../models/TestimonialModel.js');
const Occasion = require('../models/OccasionModel.js');
const PaperType = require('../models/PaperTypeModel.js');

// Mock DB
const db = require('../models/index.js');

// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      return res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

// DASHBOARD DATA
const getDashboardData = async (req, res) => {
  try {
    const products = await Product.find({});
    const customers = await User.find({ isAdmin: false });
    const testimonials = await Testimonial.find({});
    const occasions = await Occasion.find({});
    const paperTypes = await PaperType.find({});

    // Mock data
    const taxSettings = { rate: 18, included: false };
    const storeSettings = {
      storeName: "Love Unsent",
      address: "123, Calligraphy Lane, Artsy City, 400001, IN",
      gstin: "27AAAAA0000A1Z5",
      contactEmail: "contact@loveunsent.in",
      shipping: { flatRate: 0, freeShippingThreshold: 0 },
    };

    res.json({
      products,
      customers,
      testimonials,
      occasions,
      paperTypes,
      orders: db.orders,
      transactions: [],
      paymentMethods: db.paymentMethods,
      taxSettings,
      shipments: db.shipments,
      coupons: db.coupons,
      storeSettings,
      writers: db.writers,
      shippingZones: db.shippingZones,
      shippingRates: db.shippingRates,
      serviceablePincodes: db.serviceablePincodes,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};

module.exports = {
  loginAdmin,
  getDashboardData,
};
