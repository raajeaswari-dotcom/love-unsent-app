
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 3001;

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

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

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


// A simple health check endpoint
app.get('/', (req, res) => {
  res.send('Server is running and connected to the database!');
});

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
