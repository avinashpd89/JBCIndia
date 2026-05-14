import express from 'express';
import blogController from '../controllers/blogController.js';

const router = express.Router();

router.get('/', blogController.getBlogs);
router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

export default router;
