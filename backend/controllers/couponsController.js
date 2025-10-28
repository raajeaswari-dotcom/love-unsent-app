
const { coupons } = require('../models/data');

const getAllCoupons = (req, res) => {
  res.json(coupons);
};

module.exports = {
  getAllCoupons,
};
