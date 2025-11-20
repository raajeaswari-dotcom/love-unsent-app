
const Admin = require('../models/AdminModel.js');
const generateToken = require('../utils/generateToken.js');

// Import all models to fetch data for dashboard
const Product = require('../models/ProductModel.js');
const User = require('../models/UserModel.js');
const Testimonial = require('../models/TestimonialModel.js');
const Occasion = require('../models/OccasionModel.js');
const PaperType = require('../models/PaperTypeModel.js');
// Mock data for things not yet in DB
const db = require('../models/index.js');


// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


// @desc    Get all data for admin dashboard
// @route   GET /api/admin/dashboard-data
// @access  Private/Admin
const getDashboardData = async (req, res) => {
    try {
        const products = await Product.find({});
        const customers = await User.find({ isAdmin: false });
        const testimonials = await Testimonial.find({});
        const occasions = await Occasion.find({});
        const paperTypes = await PaperType.find({});
        
        // Mocked data that can be moved to DB later
        const taxSettings = { rate: 18, included: false };
        const storeSettings = {
            storeName: "Love Unsent",
            address: "123, Calligraphy Lane, Artsy City, 400001, IN",
            gstin: "27AAAAA0000A1Z5",
            contactEmail: "contact@loveunsent.in",
            shipping: { flatRate: 0, freeShippingThreshold: 0 }
        };
        const transactions = [];
        const writers = db.writers;
        const coupons = db.coupons;
        const shipments = db.shipments;
        const paymentMethods = db.paymentMethods;
        const shippingZones = db.shippingZones;
        const shippingRates = db.shippingRates;
        const serviceablePincodes = db.serviceablePincodes;
        const orders = db.orders;


        res.json({
            products,
            customers,
            testimonials,
            occasions,
            paperTypes,
            orders,
            transactions,
            paymentMethods,
            taxSettings,
            shipments,
            coupons,
            storeSettings,
            writers,
            shippingZones,
            shippingRates,
            serviceablePincodes,
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
