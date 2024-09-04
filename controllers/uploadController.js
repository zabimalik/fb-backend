const Item = require('../models/itemModel');
const { bucket } = require('../config/firebaseConfig');

const uploadItem = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: generateToken(), // Generate a token
        },
      },
    });

    blobStream.on('error', (err) => res.status(500).send(err.message));

    blobStream.on('finish', async () => {
      // Get the public URL with the download token
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media&token=${blob.metadata.metadata.firebaseStorageDownloadTokens}`;

      const newItem = new Item({ title, description, price, imageUrl });
      await newItem.save();

      res.status(200).send({ message: 'Item uploaded successfully', newItem });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Function to generate a unique token for the download URL
function generateToken() {
  return [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
}

module.exports = { uploadItem };
