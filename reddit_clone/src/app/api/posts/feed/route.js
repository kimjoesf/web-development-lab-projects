import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import CommunityMember from "@/archive/models/CommunityMember";
import Post from "@/archive/models/Post";

export async function GET() {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const memberships = await CommunityMember.find({ userId: user._id }).select(
    "communityId"
  );

  const communityIds = memberships.map((m) => m.communityId);

  const posts = await Post.find({ communityId: { $in: communityIds } })
    .sort({ createdAt: -1 })
    .limit(50)
    .populate("authorId", "username avatar")
    .populate("communityId", "name");

  return NextResponse.json(posts);
}
