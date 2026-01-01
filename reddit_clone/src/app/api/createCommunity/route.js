import { NextResponse } from "next/server";
import supabase from "@/libs/supabase";
import getCurrentUser from "@/functions/getCurrentUser";
import prisma from "@/libs/prisma";
 

export async function POST(req) {
  try {
    const body = await req.json();
    const {mediaBase64, fileName, fileType, name, description, about, type, mature} = body;

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let imageUrl= null;

    // Upload image to Supabase Storage
    if (mediaBase64 && fileName) {
      const base64Data = mediaBase64.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");

      const filePath = `communities/${crypto.randomUUID()}-${fileName}`;

      const { error } = await supabase.storage
        .from("community-images")
        .upload(filePath, buffer, {
          contentType: fileType,
          upsert: false,
        });

      if (error) {
        throw new Error(error.message);
      }

      const { data } = supabase.storage
        .from("community-images")
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    console.log(user.id);

    // Create community in DB
    const community = await prisma.community.create({
      data: {name,description,about,type,isMature: mature,imageUrl,moderatorId: user.id,}
    });

    return NextResponse.json(community);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create community" },
      { status: 500 }
    );
  }
}
