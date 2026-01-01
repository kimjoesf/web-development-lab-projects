import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

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

    
    const post = await prisma.post.findUnique({
    where: {
        id:postId,
      },   
      include: {
        author: true,       
        community: true,    
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
