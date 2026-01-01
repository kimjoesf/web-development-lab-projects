import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import getCurrentUser from "@/functions/getCurrentUser";

export async function POST(req) {
  try {
    const body = await req.json();
    const { communityId } = body;

    if (!communityId) {
      return NextResponse.json(
        { error: "communityId is required" },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // just to prevent duplicate join
    const alreadyJoined = await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: user.id,
          communityId,
        },
      },
    });

    if (alreadyJoined) {
      return NextResponse.json(
        { error: "Already joined" },
        { status: 409 }
      );
    }

     await prisma.communityMember.create({
      data: {
        userId: user.id,
        communityId,
      },
    });

    const community = await prisma.community.findUnique({
      where: { id: communityId },
    });

    return NextResponse.json(community, { status: 201 });
  } catch (error) {
    console.error("Join community error:", error);
    return NextResponse.json(
      { error: "Failed to join community" },
      { status: 500 }
    );
  }
}
