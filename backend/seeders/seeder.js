
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db.js');
const { products, admins, testimonials, occasions, paperTypes: initialPaperTypes } = require('../data/initialData.js');

// Import models
const Product = require('../models/ProductModel.js');
const Admin = require('../models/AdminModel.js');
const Testimonial = require('../models/TestimonialModel.js');
const Occasion = require('../models/OccasionModel.js');
const PaperType = require('../models/PaperTypeModel.js');
const User = require('../models/UserModel.js');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await Admin.deleteMany();
    await Testimonial.deleteMany();
    await Occasion.deleteMany();
    await PaperType.deleteMany();
    await User.deleteMany();

    // Insert new data
    const createdAdmins = await Admin.insertMany(admins);
    const createdTestimonials = await Testimonial.insertMany(testimonials);
    const createdOccasions = await Occasion.insertMany(occasions);
    const createdPaperTypes = await PaperType.insertMany(initialPaperTypes);
    
    // Map paper type names to their new MongoDB IDs
    const paperTypeMap = createdPaperTypes.reduce((acc, pt) => {
        acc[pt.name] = pt._id;
        return acc;
    }, {});
    
    // Add the paper type IDs to the products
    const productsWithPaperTypes = products.map(product => {
        let availablePaperTypeIds = [];
        // A simple logic to assign some papers to each product for seeding
        if (product.name === 'CLASSIC') {
            availablePaperTypeIds = [paperTypeMap['Cotton Rag Paper'], paperTypeMap['Linen Texture Paper'], paperTypeMap['Laid Texture Paper']];
        } else if (product.name === 'OPEN WHEN') {
            availablePaperTypeIds = [paperTypeMap['Handmade Paper'], paperTypeMap['Linen Texture Paper']];
        } else {
             availablePaperTypeIds = [paperTypeMap['Smooth Bond Paper'], paperTypeMap['Handmade Paper']];
        }
        
        return {
            ...product,
            availablePaperTypeIds
        };
    });

    await Product.insertMany(productsWithPaperTypes);


    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Admin.deleteMany();
    await Testimonial.deleteMany();
    await Occasion.deleteMany();
    await PaperType.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
