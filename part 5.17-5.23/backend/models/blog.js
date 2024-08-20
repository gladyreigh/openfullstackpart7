const mongoose = require('mongoose');

// Define the comment sub-schema
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Optional: if you want to track who made the comment
});

// Define the blog schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: {
    type: Number,
    default: 0
  },
  usersLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [commentSchema] // Add comments field with commentSchema
});

// Transform the blog document before sending it as JSON
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);
