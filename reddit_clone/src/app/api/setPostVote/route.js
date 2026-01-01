import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import getCurrentUser from "@/functions/getCurrentUser";

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { postId, voteType } = await req.json();
    if (!postId || !voteType) return NextResponse.json({ error: "Missing parameters" }, { status: 400 });

    // Check if vote exists
    let vote = await prisma.vote.findUnique({
      where: { userId_postId: { userId: user.id, postId } },
    });

    if (!vote) {
      // Create new vote
      vote = await prisma.vote.create({
        data: { userId: user.id, postId, voteType },
      });
    } else {
      if (vote.voteType === voteType) {
        // Remove vote
        await prisma.vote.delete({ where: { id: vote.id } });
        vote = null;
      } else {
        // Switch vote type
        vote = await prisma.vote.update({
          where: { id: vote.id },
          data: { voteType },
        });
      }
    }

    // Compute vote counts
    const votes = await prisma.vote.groupBy({
      by: ["voteType"],
      where: { postId },
      _count: { voteType: true },
    });

    const upvotes = votes.find(v => v.voteType === "upvote")?._count.voteType || 0;
    const downvotes = votes.find(v => v.voteType === "downvote")?._count.voteType || 0;
    const netScore = upvotes - downvotes;

    return NextResponse.json({ upvotes, downvotes, netScore });
  } catch (err) {
    console.error("Error in setPostVote:", err);
    return NextResponse.json({ error: "Failed to set vote" }, { status: 500 });
  }
}
