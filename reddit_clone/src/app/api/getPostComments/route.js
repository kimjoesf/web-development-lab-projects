import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import getCurrentUser from "@/functions/getCurrentUser";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();
    const userId = user?.id || null;

    // Fetch top-level comments
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentCommentId: null,
      },
      include: {
        author: true,
        votes: true,
      },
    });

    // Shape data to match Sanity response
    const formatted = comments.map((comment) => {
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
        replies: comment.replies,
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
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
