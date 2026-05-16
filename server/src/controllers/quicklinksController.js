import dynamoService from '../services/dynamoService.js';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = process.env.DYNAMODB_TABLE_QUICKLINKS || 'JBCQuickLinks';

const quicklinksController = {
  getLinks: async (req, res) => {
    try {
      const links = await dynamoService.getAll(TABLE_NAME);
      res.status(200).json(links);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching quick links', error: error.message });
    }
  },

  createLink: async (req, res) => {
    try {
      const linkData = {
        id: uuidv4(),
        ...req.body,
        createdAt: new Date().toISOString(),
      };
      await dynamoService.create(TABLE_NAME, linkData);
      res.status(201).json(linkData);
    } catch (error) {
      res.status(500).json({ message: 'Error creating quick link', error: error.message });
    }
  },

  updateLink: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedLink = await dynamoService.update(TABLE_NAME, id, req.body);
      res.status(200).json(updatedLink);
    } catch (error) {
      res.status(500).json({ message: 'Error updating quick link', error: error.message });
    }
  },

  deleteLink: async (req, res) => {
    try {
      const { id } = req.params;
      await dynamoService.delete(TABLE_NAME, id);
      res.status(200).json({ message: 'Quick link deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting quick link', error: error.message });
    }
  },
};

export default quicklinksController;
