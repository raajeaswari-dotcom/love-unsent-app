
const { products } = require('../models/data');

const getAllProducts = (req, res) => {
  res.json(products);
};

module.exports = {
  getAllProducts,
};
