import { NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/libs/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: "postId required" }, { status: 400 });
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        title: true,
        body: true,
        summary: true,  
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.summary) {
      return NextResponse.json({ summary: post.summary });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Summarize Reddit posts into 3–5 concise bullet points. No emojis. No markdown.",
        },
        {
          role: "user",
          content: `Title: ${post.title}\n\nPost: ${post.body || ""}`,
        },
      ],
      temperature: 0.3,
    });

    const summary = completion.choices[0].message.content;

    await prisma.post.update({
      where: { id: postId },
      data: { summary },
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("AI Summary error:", error);
    return NextResponse.json(
      { error: "Failed to summarize" },
      { status: 500 }
    );
  }
}
