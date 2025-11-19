
const Product = require('../models/ProductModel.js');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProduct = async (req, res) => {
  const { name, price, description, stock, category, gstRate, hsnCode, attributes, availablePaperTypeIds, imageUrl } = req.body;
  
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name ?? product.name;
      product.price = price ?? product.price;
      product.description = description ?? product.description;
      product.stock = stock ?? product.stock;
      product.category = category ?? product.category;
      product.gstRate = gstRate ?? product.gstRate;
      product.hsnCode = hsnCode ?? product.hsnCode;
      product.attributes = attributes ?? product.attributes;
      product.availablePaperTypeIds = availablePaperTypeIds ?? product.availablePaperTypeIds;
      product.imageUrl = imageUrl ?? product.imageUrl;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server Error updating product' });
  }
};


module.exports = {
  getAllProducts,
  updateProduct,
};
