const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/AdminModel.js');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const res = await Admin.deleteOne({ email: "admin@loveunsent.com" });

    console.log("Delete result:", res);
    process.exit(0);
  })
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });

