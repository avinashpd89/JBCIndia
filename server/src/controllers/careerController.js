import dynamoService from '../services/dynamoService.js';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = process.env.DYNAMODB_TABLE_CAREERS || 'JBCCareers';

const careerController = {
  getCareers: async (req, res) => {
    try {
      const careers = await dynamoService.getAll(TABLE_NAME);
      res.status(200).json(careers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching careers', error: error.message });
    }
  },

  createCareer: async (req, res) => {
    try {
      const careerData = {
        id: uuidv4(),
        ...req.body,
        createdAt: new Date().toISOString(),
      };
      await dynamoService.create(TABLE_NAME, careerData);
      res.status(201).json(careerData);
    } catch (error) {
      res.status(500).json({ message: 'Error creating career', error: error.message });
    }
  },

  updateCareer: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCareer = await dynamoService.update(TABLE_NAME, id, req.body);
      res.status(200).json(updatedCareer);
    } catch (error) {
      res.status(500).json({ message: 'Error updating career', error: error.message });
    }
  },

  deleteCareer: async (req, res) => {
    try {
      const { id } = req.params;
      await dynamoService.delete(TABLE_NAME, id);
      res.status(200).json({ message: 'Career deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting career', error: error.message });
    }
  },
};

export default careerController;
