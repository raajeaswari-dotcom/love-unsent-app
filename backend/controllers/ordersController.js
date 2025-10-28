
const { orders } = require('../models/data');

const getAllOrders = (req, res) => {
  res.json(orders);
};

module.exports = {
  getAllOrders,
};
