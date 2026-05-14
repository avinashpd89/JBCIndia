import express from 'express';
import leaderController from '../controllers/leaderController.js';

const router = express.Router();

router.get('/', leaderController.getLeaders);
router.post('/', leaderController.createLeader);
router.put('/:id', leaderController.updateLeader);
router.delete('/:id', leaderController.deleteLeader);

export default router;
