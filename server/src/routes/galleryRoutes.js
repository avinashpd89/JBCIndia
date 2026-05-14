import express from 'express';
import galleryController from '../controllers/galleryController.js';

const router = express.Router();

router.get('/', galleryController.getGallery);
router.post('/', galleryController.createGalleryItem);
router.put('/:id', galleryController.updateGalleryItem);
router.delete('/:id', galleryController.deleteGalleryItem);

export default router;
