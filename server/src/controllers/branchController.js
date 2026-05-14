import dynamoService from '../services/dynamoService.js';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = process.env.DYNAMODB_TABLE_BRANCHES || 'JBCBranches';

const branchController = {
  getBranches: async (req, res) => {
    try {
      const branches = await dynamoService.getAll(TABLE_NAME);
      res.status(200).json(branches);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching branches', error: error.message });
    }
  },

  createBranch: async (req, res) => {
    try {
      const branchData = {
        id: uuidv4(),
        ...req.body,
        createdAt: new Date().toISOString(),
      };
      await dynamoService.create(TABLE_NAME, branchData);
      res.status(201).json(branchData);
    } catch (error) {
      res.status(500).json({ message: 'Error creating branch', error: error.message });
    }
  },

  updateBranch: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBranch = await dynamoService.update(TABLE_NAME, id, req.body);
      res.status(200).json(updatedBranch);
    } catch (error) {
      res.status(500).json({ message: 'Error updating branch', error: error.message });
    }
  },

  deleteBranch: async (req, res) => {
    try {
      const { id } = req.params;
      await dynamoService.delete(TABLE_NAME, id);
      res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting branch', error: error.message });
    }
  },
};

export default branchController;
