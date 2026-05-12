import express from 'express';
import * as contactController from '../controllers/contactController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.post('/', contactController.createContact);

// Protected routes (Admin only)
router.get('/', authMiddleware, adminMiddleware, contactController.getAllContacts);
router.get('/:id', authMiddleware, adminMiddleware, contactController.getContactById);
router.put('/:id', authMiddleware, adminMiddleware, contactController.updateContactStatus);
router.delete('/:id', authMiddleware, adminMiddleware, contactController.deleteContact);

export default router;
