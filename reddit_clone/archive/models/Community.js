import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isMature: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["public", "restricted", "private"],
    default: "public",
  },
  about: {
    type: String,
    default: "",
  },
});

 
const Community = mongoose.models.Community || mongoose.model('Community', CommunitySchema);
export default Community;

// slug: {
//   type: String,
//   required: true,
//   unique: true,
//   lowercase: true,
//   trim: true,
// },