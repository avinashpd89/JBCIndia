import express from 'express';
import * as blogController from '../controllers/blogController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Protected routes
router.post('/', authMiddleware, upload.single('image'), blogController.createBlog);
router.put('/:id', authMiddleware, blogController.updateBlog);
router.delete('/:id', authMiddleware, adminMiddleware, blogController.deleteBlog);

export default router;
