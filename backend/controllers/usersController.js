
const { customers } = require('../models/data');

const getAllUsers = (req, res) => {
  res.json(customers);
};

module.exports = {
  getAllUsers,
};
