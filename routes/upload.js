// routes/upload.js
const express = require('express');
const { uploadItem } = require('../controllers/uploadController');
const { getImageById } = require('../controllers/singleImage');
const upload = require('../middleware/multer');

const { getAllImages } = require('../controllers/imageController');

const router = express.Router();

router.post('/upload' , upload.single('image'), uploadItem);
router.get('/images', getAllImages);
router.get('/images/:id' , getImageById);

module.exports = router;
