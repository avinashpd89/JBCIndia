import express from 'express';
import { upload } from '../services/s3Service.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // multer-s3 attaches the S3 URL to req.file.location
    res.status(200).json({ 
      message: 'File uploaded successfully',
      imageUrl: req.file.location
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

export default router;
