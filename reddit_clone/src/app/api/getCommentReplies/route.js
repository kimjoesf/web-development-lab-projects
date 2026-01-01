import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import getCurrentUser from "@/functions/getCurrentUser";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("commentId");

    if (!commentId) {
      return NextResponse.json(
        { error: "commentId is required" },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();
    const userId = user?.id || null;

    // Fetch immediate replies of the comment
    const replies = await prisma.comment.findMany({
      where: { parentCommentId: commentId },
      include: {
        author: true,
        votes: true,
      },
    });

    const formatted = replies.map((comment) => {
      const upvotes = comment.votes.filter(
        (v) => v.voteType === "upvote"
      ).length;

      const downvotes = comment.votes.filter(
        (v) => v.voteType === "downvote"
      ).length;

      const netScore = upvotes - downvotes;

      const userVote = userId
        ? comment.votes.find((v) => v.userId === userId)?.voteType || null
        : null;

      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        author: comment.author,
        votes: {
          upvotes,
          downvotes,
          netScore,
          voteStatus: userVote,
        },
      };
    });

    formatted.sort((a, b) => {
      if (b.votes.netScore !== a.votes.netScore) {
        return b.votes.netScore - a.votes.netScore;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error("Error fetching replies:", error);
    return NextResponse.json(
      { error: "Failed to fetch replies" },
      { status: 500 }
    );
  }
}
