import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import Vote from "@/archive/models/Vote";
import Post from "@/archive/models/Post";

export async function POST(req, { params }) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { value } = await req.json(); // 1 or -1
  const { postId } = params;

  if (![1, -1].includes(value)) {
    return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
  }

  const existingVote = await Vote.findOne({
    userId: user._id,
    postId,
  });

  // CASE A: No existing vote
  if (!existingVote) {
    await Vote.create({
      userId: user._id,
      postId,
      value,
    });

    await Post.findByIdAndUpdate(postId, {
      $inc: { score: value },
    });

    return NextResponse.json({ vote: value });
  }

  // CASE B: Same vote → remove
  if (existingVote.value === value) {
    await Vote.findByIdAndDelete(existingVote._id);

    await Post.findByIdAndUpdate(postId, {
      $inc: { score: -value },
    });

    return NextResponse.json({ vote: 0 });
  }

  // CASE C: Switch vote
  const scoreChange = value * 2;

  await Vote.findByIdAndUpdate(existingVote._id, {
    value,
  });

  await Post.findByIdAndUpdate(postId, {
    $inc: { score: scoreChange },
  });

  return NextResponse.json({ vote: value });
}
