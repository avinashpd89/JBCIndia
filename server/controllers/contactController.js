import Contact from '../models/Contact.js';

// Get all contact messages (Admin only)
const getAllContacts = async (req, res) => {
  try {
    const { status, limit, page } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Contact.countDocuments(filter);

    res.json({ contacts, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single contact message
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json({ contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create contact message
const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
    });

    await contact.save();
    res.status(201).json({ message: 'Contact message sent successfully', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update contact status
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'responded', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json({ message: 'Contact status updated successfully', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete contact message
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllContacts, getContactById, createContact, updateContactStatus, deleteContact };
