const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ⚠️ IMPORTANT FOR RENDER — use dynamic port
const port = process.env.PORT || 3001;

// Wide-open CORS (for testing) 
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Import routes
const productsRoutes = require('./routes/products.js');
const ordersRoutes = require('./routes/orders.js');
const usersRoutes = require('./routes/users.js');
const paymentsRoutes = require('./routes/payments.js');
const couponsRoutes = require('./routes/coupons.js');
const writersRoutes = require('./routes/writers.js');
const testimonialsRoutes = require('./routes/testimonials.js');
const adminRoutes = require('./routes/adminRoutes.js');
const shippingRoutes = require('./routes/shipping.js');
const occasionsRoutes = require('./routes/occasions.js');
const paperTypesRoutes = require('./routes/paperTypes.js');

// Mount routers
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/coupons', couponsRoutes);
app.use('/api/writers', writersRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/occasions', occasionsRoutes);
app.use('/api/papertypes', paperTypesRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is live and connected!' });
});

// Start server
app.listen(port, () => {
  console.log(`🔥 Server running on port ${port}`);
});
