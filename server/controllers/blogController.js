import Blog from '../models/Blog.js';

// Get all blogs with filtering
const getAllBlogs = async (req, res) => {
  try {
    const { category, search, limit, page } = req.query;

    let filter = { published: true };

    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Blog.countDocuments(filter);

    res.json({ blogs, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create blog
const createBlog = async (req, res) => {
  try {
    const { title, content, category, published } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const blog = new Blog({
      title,
      content,
      category: category || 'General',
      published: published === 'true' || published === true,
      author: req.user?.id,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    const { title, content, category, published } = req.body;

    const updateData = {
      title,
      content,
      category,
      published: published === 'true' || published === true,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
