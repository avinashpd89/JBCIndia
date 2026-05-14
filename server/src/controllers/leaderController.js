import dynamoService from '../services/dynamoService.js';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = process.env.DYNAMODB_TABLE_LEADERS || 'JBCOurLeaders';

const leaderController = {
  getLeaders: async (req, res) => {
    try {
      const leaders = await dynamoService.getAll(TABLE_NAME);
      res.status(200).json(leaders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching leaders', error: error.message });
    }
  },

  createLeader: async (req, res) => {
    try {
      const leaderData = {
        id: uuidv4(),
        ...req.body,
        createdAt: new Date().toISOString(),
      };
      await dynamoService.create(TABLE_NAME, leaderData);
      res.status(201).json(leaderData);
    } catch (error) {
      res.status(500).json({ message: 'Error creating leader', error: error.message });
    }
  },

  updateLeader: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedLeader = await dynamoService.update(TABLE_NAME, id, req.body);
      res.status(200).json(updatedLeader);
    } catch (error) {
      res.status(500).json({ message: 'Error updating leader', error: error.message });
    }
  },

  deleteLeader: async (req, res) => {
    try {
      const { id } = req.params;
      await dynamoService.delete(TABLE_NAME, id);
      res.status(200).json({ message: 'Leader deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting leader', error: error.message });
    }
  },
};

export default leaderController;
