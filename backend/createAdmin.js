const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/AdminModel.js');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const adminExists = await Admin.findOne({ email: "admin@loveunsent.com" });

    if (adminExists) {
      console.log("Admin already exists. Exiting.");
      process.exit(0);
    }

    const admin = new Admin({
      name: "Main Admin",
      email: "admin@loveunsent.com",
      password: "LoveUnsent@2025",
    });

    await admin.save();

    console.log("Admin created successfully!");
    console.log("Email: admin@loveunsent.com");
    console.log("Password: LoveUnsent@2025");

    process.exit(0);
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
