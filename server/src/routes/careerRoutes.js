import express from 'express';
import careerController from '../controllers/careerController.js';

const router = express.Router();

router.get('/', careerController.getCareers);
router.post('/', careerController.createCareer);
router.put('/:id', careerController.updateCareer);
router.delete('/:id', careerController.deleteCareer);

export default router;
