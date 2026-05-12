import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      default: 'General',
      enum: ['Jewelry Care', 'Gemstones', 'Trends', 'Tips', 'Stories', 'General'],
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);
