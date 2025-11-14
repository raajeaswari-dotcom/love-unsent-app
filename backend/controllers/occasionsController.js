const db = require('../models/index.js');

const getAllOccasions = (req, res) => {
  res.json(db.occasions);
};

const createOccasion = (req, res) => {
  const { name, category, description } = req.body;
  if (!name || !category || !description) {
    return res.status(400).json({ message: 'Name, category, and description are required.' });
  }
  const newOccasion = {
    id: db.occasions.length > 0 ? Math.max(...db.occasions.map(o => o.id)) + 1 : 1,
    name,
    category,
    description,
  };
  db.occasions.push(newOccasion);
  res.status(201).json(newOccasion);
};

const updateOccasion = (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;
  const occasionIndex = db.occasions.findIndex(o => o.id === parseInt(id));

  if (occasionIndex === -1) {
    return res.status(404).json({ message: 'Occasion not found.' });
  }
  
  if (!name || !category || !description) {
    return res.status(400).json({ message: 'Name, category, and description are required.' });
  }

  const updatedOccasion = { ...db.occasions[occasionIndex], name, category, description };
  db.occasions[occasionIndex] = updatedOccasion;
  
  res.json(updatedOccasion);
};

const deleteOccasion = (req, res) => {
  const { id } = req.params;
  const occasionIndex = db.occasions.findIndex(o => o.id === parseInt(id));

  if (occasionIndex === -1) {
    return res.status(404).json({ message: 'Occasion not found.' });
  }

  db.occasions.splice(occasionIndex, 1);

  res.status(200).json({ message: 'Occasion deleted successfully.' });
};

module.exports = {
  getAllOccasions,
  createOccasion,
  updateOccasion,
  deleteOccasion,
};
