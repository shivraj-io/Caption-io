// OLD CODE (commented out for reference):
// const mongoose = require('mongoose');
// const postSchema = new mongoose.Schema({
//   caption: String,
//   image: String,
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'users'
//   }
// }, { timestamps: true });
// const postModel = mongoose.model('posts', postSchema);
// const userModel = mongoose.model('users', userSchema); // ❌ This line causes error
// module.exports = postModel;

// NEW CODE (production-level):
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    }
  },
  { 
    timestamps: true 
  }
);

// Index for faster queries
postSchema.index({ userId: 1 });
postSchema.index({ createdAt: -1 });

// ✅ Only create model if it doesn't exist
const postModel = mongoose.models.posts || mongoose.model('posts', postSchema);

module.exports = postModel;