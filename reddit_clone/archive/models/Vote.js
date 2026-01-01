import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  voteType: {
    type: String,
    enum: ['upvote', 'downvote'], // only these two values allowed
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    default: null, // null if vote is on a comment
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null, // null if vote is on a post
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a user can vote only once per post or comment
voteSchema.index({ user: 1, post: 1 }, { unique: true, sparse: true });
voteSchema.index({ user: 1, comment: 1 }, { unique: true, sparse: true });

const Vote = mongoose.models.Vote || mongoose.model('Vote', voteSchema);
export default Vote;
