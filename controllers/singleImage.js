// controllers/imageController.js
const Item = require('../models/itemModel');

// Existing getAllImages function...

exports.getImageById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
