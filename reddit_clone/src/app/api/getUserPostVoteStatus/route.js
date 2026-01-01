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

    if (!user) {
      return NextResponse.json(null, { status: 200 });
    }

    const vote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
      select: {
        voteType: true,
      },
    });

    
    return NextResponse.json(vote?.voteType ?? null, { status: 200 });
  } catch (error) {
    console.error("Error fetching user vote status:", error);
    return NextResponse.json(
      { error: "Failed to fetch vote status" },
      { status: 500 }
    );
  }
}
