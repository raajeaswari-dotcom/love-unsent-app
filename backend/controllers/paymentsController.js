
const db = require('../models/index.js');

const getAllPaymentMethods = (req, res) => {
  res.json(db.paymentMethods);
};

module.exports = {
  getAllPaymentMethods,
};