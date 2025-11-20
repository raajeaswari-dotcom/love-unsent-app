
const db = require('../models/index.js');

const getAllCoupons = (req, res) => {
  res.json(db.coupons);
};

module.exports = {
  getAllCoupons,
};