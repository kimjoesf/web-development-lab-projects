import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const skip = Number(searchParams.get("skip") || 0);

    
    const posts = await prisma.post.findMany({
      orderBy: { publishedAt: "desc" },
      take: 10,
      skip,
      include: {
        author: true,       
        community: true,    
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
