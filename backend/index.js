const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Render requires EXACTLY this:
// Do NOT use fallback like "|| 3001"
const port = process.env.PORT;

// Avoid CORS issues
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
app.options('*', cors());

// Body parser
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products.js'));
app.use('/api/orders', require('./routes/orders.js'));
app.use('/api/users', require('./routes/users.js'));
app.use('/api/payments', require('./routes/payments.js'));
app.use('/api/coupons', require('./routes/coupons.js'));
app.use('/api/writers', require('./routes/writers.js'));
app.use('/api/testimonials', require('./routes/testimonials.js'));
app.use('/api/admin', require('./routes/adminRoutes.js'));
app.use('/api/shipping', require('./routes/shipping.js'));
app.use('/api/occasions', require('./routes/occasions.js'));
app.use('/api/papertypes', require('./routes/paperTypes.js'));

// Health check
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
