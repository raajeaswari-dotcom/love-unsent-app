const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Load .env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Render MUST fully control this port
const port = process.env.PORT || 3001;

// CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

// ROUTES --------------------------------------------------
app.use('/api/products', require('./routes/products.js'));
app.use('/api/orders', require('./routes/orders.js'));
app.use('/api/users', require('./routes/users.js'));
app.use('/api/payments', require('./routes/payments.js'));
app.use('/api/coupons', require('./routes/coupons.js'));
app.use('/api/writers', require('./routes/writers.js'));
app.use('/api/testimonials', require('./routes/testimonials.js'));
app.use('/api/admin', require('./routes/adminRoutes.js')); // <-- Admin login route
app.use('/api/shipping', require('./routes/shipping.js'));
app.use('/api/occasions', require('./routes/occasions.js'));
app.use('/api/papertypes', require('./routes/paperTypes.js'));

// HEALTH CHECK ---------------------------------------------
app.get('/', (req, res) => {
  res.send('Server is running and connected to the database!');
});

// START SERVER ----------------------------------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
