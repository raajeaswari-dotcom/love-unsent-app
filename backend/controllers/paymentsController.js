
const { paymentMethods } = require('../models/data');

const getAllPaymentMethods = (req, res) => {
  res.json(paymentMethods);
};

module.exports = {
  getAllPaymentMethods,
};
