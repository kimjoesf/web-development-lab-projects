import mongoose from 'mongoose';
import User from './User'; // assuming User schema is in User.js
// Subreddit will be defined later

const MediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    width: Number,
    height: Number,
    duration: Number,
  },
  { _id: false }
);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  originalTitle: {
    type: String,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subreddit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subreddit',  
    required: false,  
  },
  body: {
    type: String,
    default: '',
  },
  media: [MediaSchema], // array of media objects
  isReported: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;
