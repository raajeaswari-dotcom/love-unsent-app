
const jwt = require('jsonwebtoken');
const db = require('../models/index.js');

// Mock Admin User
const MOCK_ADMIN = {
    _id: '60d5ec49a9b8b84b8c8e8b8b', // Static ID for JWT
    email: 'admin@loveunsent.com',
    name: 'Admin User',
    password: 'admin' // Using plain text for this mock setup
};

// Generate JWT
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'a_very_strong_fallback_secret_for_development_env';
  return jwt.sign({ id }, secret, {
    expiresIn: '1d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Robustly check credentials by casting to string before trimming
    const submittedEmail = String(email || '').trim().toLowerCase();
    const submittedPassword = String(password || '').trim();

    if (submittedEmail === MOCK_ADMIN.email && submittedPassword === MOCK_ADMIN.password) {
      res.json({
        _id: MOCK_ADMIN._id,
        name: MOCK_ADMIN.name,
        email: MOCK_ADMIN.email,
        token: generateToken(MOCK_ADMIN._id),
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
    // In a real app, this data would be fetched from the database.
    // For now, we use the mock data.
    const taxSettings = { rate: 18, included: false };
    const storeSettings = {
        storeName: "Love Unsent",
        address: "123, Calligraphy Lane, Artsy City, 400001, IN",
        gstin: "27AAAAA0000A1Z5",
        contactEmail: "contact@loveunsent.in",
        shipping: { flatRate: 0, freeShippingThreshold: 0 }
    };
    const transactions = []; // Mocked as empty for now

    res.json({
        orders: db.orders,
        products: db.products,
        customers: db.customers,
        transactions,
        paymentMethods: db.paymentMethods,
        taxSettings,
        shipments: db.shipments,
        coupons: db.coupons,
        storeSettings,
        writers: db.writers,
        testimonials: db.testimonials,
        shippingZones: db.shippingZones,
        shippingRates: db.shippingRates,
        serviceablePincodes: db.serviceablePincodes,
        occasions: db.occasions,
        paperTypes: db.paperTypes,
    });
};


module.exports = { 
    loginAdmin,
    getDashboardData,
};
