
const db = require('../models/index.js');

const getAllPaperTypes = (req, res) => {
  res.json(db.paperTypes);
};

const createPaperType = (req, res) => {
  const { name, description, imageUrl } = req.body;
  if (!name || !description || !imageUrl) {
    return res.status(400).json({ message: 'Name, description, and imageUrl are required.' });
  }
  const newPaperType = {
    id: db.paperTypes.length > 0 ? Math.max(...db.paperTypes.map(p => p.id)) + 1 : 1,
    name,
    description,
    imageUrl,
  };
  db.paperTypes.push(newPaperType);
  res.status(201).json(newPaperType);
};

const updatePaperType = (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl } = req.body;
  const paperTypeIndex = db.paperTypes.findIndex(p => p.id === parseInt(id));

  if (paperTypeIndex === -1) {
    return res.status(404).json({ message: 'Paper type not found.' });
  }
  
  if (!name || !description || !imageUrl) {
    return res.status(400).json({ message: 'Name, description, and imageUrl are required.' });
  }

  const updatedPaperType = { ...db.paperTypes[paperTypeIndex], name, description, imageUrl };
  db.paperTypes[paperTypeIndex] = updatedPaperType;
  
  res.json(updatedPaperType);
};

const deletePaperType = (req, res) => {
  const { id } = req.params;
  const paperTypeIndex = db.paperTypes.findIndex(p => p.id === parseInt(id));

  if (paperTypeIndex === -1) {
    return res.status(404).json({ message: 'Paper type not found.' });
  }

  db.paperTypes.splice(paperTypeIndex, 1);

  res.status(200).json({ message: 'Paper type deleted successfully.' });
};

module.exports = {
  getAllPaperTypes,
  createPaperType,
  updatePaperType,
  deletePaperType
};
