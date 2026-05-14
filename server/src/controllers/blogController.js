import dynamoService from '../services/dynamoService.js';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = process.env.DYNAMODB_TABLE_BLOGS || 'JBCBlogs';

const blogController = {
  getBlogs: async (req, res) => {
    try {
      const blogs = await dynamoService.getAll(TABLE_NAME);
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs', error: error.message });
    }
  },

  createBlog: async (req, res) => {
    try {
      const blogData = {
        id: uuidv4(),
        ...req.body,
        createdAt: new Date().toISOString(),
      };
      await dynamoService.create(TABLE_NAME, blogData);
      res.status(201).json(blogData);
    } catch (error) {
      res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBlog = await dynamoService.update(TABLE_NAME, id, req.body);
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ message: 'Error updating blog', error: error.message });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      await dynamoService.delete(TABLE_NAME, id);
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
  },
};

export default blogController;
