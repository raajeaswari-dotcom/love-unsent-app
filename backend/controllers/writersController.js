
const db = require('../models/index.js');

const getAllWriters = (req, res) => {
  res.json(db.writers);
};

module.exports = {
  getAllWriters,
};