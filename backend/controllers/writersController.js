
const { writers } = require('../models/data');

const getAllWriters = (req, res) => {
  res.json(writers);
};

module.exports = {
  getAllWriters,
};
