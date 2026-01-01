import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import getCurrentUser from "@/functions/getCurrentUser";

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { commentId, voteType } = await req.json();
    if (!commentId || !voteType) return NextResponse.json({ error: "Missing parameters" }, { status: 400 });

    // Check if vote exists
    let vote = await prisma.vote.findUnique({
      where: { userId_commentId: { userId: user.id, commentId } },
    });

    if (!vote) {
      vote = await prisma.vote.create({
        data: { userId: user.id, commentId, voteType },
      });
    } else {
      if (vote.voteType === voteType) {
        await prisma.vote.delete({ where: { id: vote.id } });
        vote = null;
      } else {
        vote = await prisma.vote.update({
          where: { id: vote.id },
          data: { voteType },
        });
      }
    }

    const votes = await prisma.vote.groupBy({
      by: ["voteType"],
      where: { commentId },
      _count: { voteType: true },
    });

    const upvotes = votes.find(v => v.voteType === "upvote")?._count.voteType || 0;
    const downvotes = votes.find(v => v.voteType === "downvote")?._count.voteType || 0;
    const netScore = upvotes - downvotes;

    return NextResponse.json({ upvotes, downvotes, netScore });
  } catch (err) {
    console.error("Error in setCommentVote:", err);
    return NextResponse.json({ error: "Failed to set vote" }, { status: 500 });
  }
}
