import { NextResponse } from "next/server";
import Post from "@/archive/models/Post";
import CommunityMember from "@/archive/models/CommunityMember";



export async function POST(req) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, media, communityId } = await req.json();

  if (!title)
    return NextResponse.json({ error: "Title required" }, { status: 400 });

  if (!content && (!media || media.length === 0))
    return NextResponse.json(
      { error: "Post must have text or media" },
      { status: 400 }
    );

  const isMember = await CommunityMember.findOne({
    communityId,
    userId: user._id,
  });

  if (!isMember)
    return NextResponse.json(
      { error: "Join community first" },
      { status: 403 }
    );

  const post = await Post.create({
    title,
    content,
    media: media || [],
    authorId: user._id,
    communityId,
  });

  return NextResponse.json(post, { status: 201 });
}
