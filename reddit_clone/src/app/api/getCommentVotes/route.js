import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

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

    const [upvotes, downvotes] = await Promise.all([
      prisma.vote.count({
        where: {
          commentId,
          voteType: "upvote",
        },
      }),
      prisma.vote.count({
        where: {
          commentId,
          voteType: "downvote",
        },
      }),
    ]);

    const result = {
      upvotes,
      downvotes,
      netScore: upvotes - downvotes,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching post votes:", error);
    return NextResponse.json(
      { error: "Failed to fetch post votes" },
      { status: 500 }
    );
  }
}
