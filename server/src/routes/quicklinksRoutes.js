import express from 'express';
import quicklinksController from '../controllers/quicklinksController.js';

const router = express.Router();

router.get('/', quicklinksController.getLinks);
router.post('/', quicklinksController.createLink);
router.put('/:id', quicklinksController.updateLink);
router.delete('/:id', quicklinksController.deleteLink);

export default router;
