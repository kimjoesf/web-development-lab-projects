import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import supabase from "@/libs/supabase";
import getCurrentUser from "@/functions/getCurrentUser";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      mediaBase64,
      fileName,
      fileType,
      content,
      postId,
      parentCommentId,
    } = body;

    if (!content&&!mediaBase64 || !postId) {
      return NextResponse.json(
        { error: "content and postId are required" },
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

    let imageUrl = null;

    // optional image upload
    if (mediaBase64 && fileName) {
      const base64Data = mediaBase64.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");

      const filePath = `comments/${crypto.randomUUID()}-${fileName}`;

      const { error } = await supabase.storage
        .from("comment-images")
        .upload(filePath, buffer, {
          contentType: fileType,
          upsert: false,
        });

      if (error) throw new Error(error.message);

      const { data } = supabase.storage
        .from("comment-images")
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        imageUrl,
        postId,
        parentCommentId: parentCommentId || null,
        authorId: user.id,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
