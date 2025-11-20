
const Occasion = require('../models/OccasionModel.js');

const getAllOccasions = async (req, res) => {
  try {
    const occasions = await Occasion.find({});
    res.json(occasions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createOccasion = async (req, res) => {
  const { name, category, description } = req.body;
  if (!name || !category || !description) {
    return res.status(400).json({ message: 'Name, category, and description are required.' });
  }
  
  try {
    const occasion = new Occasion({ name, category, description });
    const createdOccasion = await occasion.save();
    res.status(201).json(createdOccasion);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateOccasion = async (req, res) => {
  const { name, category, description } = req.body;
  
  try {
    const occasion = await Occasion.findById(req.params.id);

    if (occasion) {
      occasion.name = name || occasion.name;
      occasion.category = category || occasion.category;
      occasion.description = description || occasion.description;

      const updatedOccasion = await occasion.save();
      res.json(updatedOccasion);
    } else {
      res.status(404).json({ message: 'Occasion not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteOccasion = async (req, res) => {
  try {
    const occasion = await Occasion.findById(req.params.id);

    if (occasion) {
      await occasion.deleteOne();
      res.json({ message: 'Occasion removed' });
    } else {
      res.status(404).json({ message: 'Occasion not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllOccasions,
  createOccasion,
  updateOccasion,
  deleteOccasion,
};
