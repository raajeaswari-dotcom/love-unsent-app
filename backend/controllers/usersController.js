
const db = require('../models/index.js');

const getAllUsers = (req, res) => {
  res.json(db.customers);
};

module.exports = {
  getAllUsers,
};