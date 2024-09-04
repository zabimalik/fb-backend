// controllers/imageController.js
const Item = require('../models/itemModel');

exports.getAllImages = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
