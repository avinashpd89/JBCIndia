import express from 'express';
import * as productController from '../controllers/productController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected routes (Admin only)
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), productController.createProduct);
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

export default router;
