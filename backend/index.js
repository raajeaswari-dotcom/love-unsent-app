
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Import routes
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const usersRoutes = require('./routes/users');
const paymentsRoutes = require('./routes/payments');
const couponsRoutes = require('./routes/coupons');
const writersRoutes = require('./routes/writers');
const testimonialsRoutes = require('./routes/testimonials');

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/coupons', couponsRoutes);
app.use('/api/writers', writersRoutes);
app.use('/api/testimonials', testimonialsRoutes);


// A simple health check endpoint
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
