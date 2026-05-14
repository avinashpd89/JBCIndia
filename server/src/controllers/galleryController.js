import dynamoService from '../services/dynamoService.js';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = process.env.DYNAMODB_TABLE_GALLERY || 'JBCGallery';

const galleryController = {
  getGallery: async (req, res) => {
    try {
      const items = await dynamoService.getAll(TABLE_NAME);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching gallery', error: error.message });
    }
  },

  createGalleryItem: async (req, res) => {
    try {
      const itemData = {
        id: uuidv4(),
        ...req.body,
        createdAt: new Date().toISOString(),
      };
      await dynamoService.create(TABLE_NAME, itemData);
      res.status(201).json(itemData);
    } catch (error) {
      res.status(500).json({ message: 'Error creating gallery item', error: error.message });
    }
  },

  updateGalleryItem: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedItem = await dynamoService.update(TABLE_NAME, id, req.body);
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: 'Error updating gallery item', error: error.message });
    }
  },

  deleteGalleryItem: async (req, res) => {
    try {
      const { id } = req.params;
      await dynamoService.delete(TABLE_NAME, id);
      res.status(200).json({ message: 'Gallery item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting gallery item', error: error.message });
    }
  },
};

export default galleryController;
