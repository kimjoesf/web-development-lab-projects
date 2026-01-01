import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import CommunityMember from "@/archive/models/CommunityMember";
import Community from "@/archive/Community";

export async function POST(_, { params }) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { communityId } = params;

  const exists = await CommunityMember.findOne({
    communityId,
    userId: user._id,
  });

  if (exists)
    return NextResponse.json({ error: "Already joined" }, { status: 400 });

  await CommunityMember.create({
    communityId,
    userId: user._id,
  });

  await Community.findByIdAndUpdate(communityId, {
    $inc: { membersCount: 1 },
  });

  return NextResponse.json({ success: true });
}
