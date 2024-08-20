const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3, // Enforce a minimum length of 3 characters
  },
  name: String,
  passwordHash: {
    type: String,
    required: true, // Ensure passwordHash is always provided
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

// Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator);

// Transform the output when sending JSON responses
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Convert _id to id and remove sensitive information
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // Remove the passwordHash from the JSON output
  },
});

module.exports = mongoose.model('User', userSchema);
