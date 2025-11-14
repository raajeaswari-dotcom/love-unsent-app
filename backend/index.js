
const express = require('express');
const cors = require('cors');

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

// More explicit CORS configuration to handle preflight requests for methods like POST
const corsOptions = {
  origin: '*', // Allow all origins for development
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight across-the-board.

app.use(express.json());

// Use routes
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

// In-memory store for newsletter subscriptions
const subscriptions = new Set();

// Newsletter Subscription Endpoint
app.post('/api/newsletter/subscribe', (req, res) => {
    const { email } = req.body;
    
    // Basic validation
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Email is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }
    
    if (subscriptions.has(email)) {
        return res.status(409).json({ message: 'This email is already subscribed.' });
    }

    subscriptions.add(email);
    console.log('New subscription added:', email);
    console.log('Total subscriptions:', subscriptions.size);
    
    res.status(201).json({ message: 'Thank you for subscribing!' });
});


// A simple health check endpoint
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
