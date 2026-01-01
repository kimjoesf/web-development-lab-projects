// import mongoose from "mongoose";

// const CommunitySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       minlength: 3,
//       maxlength: 21,
//     },
//     description: {
//       type: String,
//       maxlength: 300,
//       default: "",
//     },
//     creatorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     membersCount: {
//       type: Number,
//       default: 1,
//     },
//     isMature: {
//       type: Boolean,
//       default: false,
//     },
//     type: {
//       type: String,
//       enum: ["public", "restricted", "private"],
//       default: "public",
//     },
//     about: {
//       type: String,
//       default: "",
//     },
//     image: {
//       type: String,  
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// CommunitySchema.index({ name: "text" });

// const Post =  mongoose.models.Community || mongoose.model("Community", CommunitySchema);
// export default Post;
