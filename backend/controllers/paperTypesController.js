
const PaperType = require('../models/PaperTypeModel.js');

const getAllPaperTypes = async (req, res) => {
  try {
    const paperTypes = await PaperType.find({});
    res.json(paperTypes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createPaperType = async (req, res) => {
  const { name, description, imageUrl } = req.body;
  if (!name || !description || !imageUrl) {
    return res.status(400).json({ message: 'Name, description, and imageUrl are required.' });
  }

  try {
    const paperType = new PaperType({ name, description, imageUrl });
    const createdPaperType = await paperType.save();
    res.status(201).json(createdPaperType);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updatePaperType = async (req, res) => {
  const { name, description, imageUrl } = req.body;

  try {
    const paperType = await PaperType.findById(req.params.id);

    if (paperType) {
      paperType.name = name || paperType.name;
      paperType.description = description || paperType.description;
      paperType.imageUrl = imageUrl || paperType.imageUrl;
      
      const updatedPaperType = await paperType.save();
      res.json(updatedPaperType);
    } else {
      res.status(404).json({ message: 'Paper type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deletePaperType = async (req, res) => {
  try {
    const paperType = await PaperType.findById(req.params.id);

    if (paperType) {
      await paperType.deleteOne();
      res.json({ message: 'Paper type removed' });
    } else {
      res.status(404).json({ message: 'Paper type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllPaperTypes,
  createPaperType,
  updatePaperType,
  deletePaperType
};
