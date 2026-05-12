import Product from '../models/Product.js';

// Get all products with filtering and sorting
const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, featured, sort, limit, search } = req.query;
    
    let filter = {};
    
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let query = Product.find(filter);

    // Sorting
    if (sort === 'price-low') {
      query = query.sort({ price: 1 });
    } else if (sort === 'price-high') {
      query = query.sort({ price: -1 });
    } else if (sort === 'popular') {
      query = query.sort({ reviews: -1 });
    } else if (sort === 'rating') {
      query = query.sort({ rating: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    // Limit results
    if (limit) {
      query = query.limit(Number(limit));
    }

    const products = await query;
    res.json({ products, total: products.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, material, weight, featured } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const product = new Product({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock) || 0,
      material,
      weight: Number(weight) || 0,
      featured: featured === 'true' || featured === true,
      createdBy: req.user?.id,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, material, weight, featured } = req.body;

    const updateData = {
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      material,
      weight: Number(weight),
      featured: featured === 'true' || featured === true,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
