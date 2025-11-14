
const db = require('../models/index.js');

const getAllProducts = (req, res) => {
  res.json(db.products);
};

module.exports = {
  getAllProducts,
};