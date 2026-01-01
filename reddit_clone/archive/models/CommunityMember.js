import mongoose from "mongoose";

const CommunityMemberSchema = new mongoose.Schema(
  {
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  { timestamps: true }
);

CommunityMemberSchema.index(
  { communityId: 1, userId: 1 },
  { unique: true }
);

export default mongoose.models.CommunityMember ||
  mongoose.model("CommunityMember", CommunityMemberSchema);
