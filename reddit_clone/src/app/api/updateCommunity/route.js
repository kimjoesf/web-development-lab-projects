import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import getCurrentUser from "@/functions/getCurrentUser";
import supabase from "@/libs/supabase";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { communityId,name , mediaBase64, fileName, fileType, bannerBase64, bannerFileName, bannerFileType } = body;

    if (!communityId) {
      return NextResponse.json({ error: "communityId is required" }, { status: 400 });
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch community to verify ownership
    const community = await prisma.community.findUnique({
      where: { id: communityId },
    });

    if (!community) {
      return NextResponse.json({ error: "Community not found" }, { status: 404 });
    }

    if (community.moderatorId !== user.id) {
      return NextResponse.json({ error: "You are not the moderator of this community" }, { status: 403 });
    }

    let updatedData = {
      name: name || community.name,
    };

    // Upload new image if provided
    if (mediaBase64 && fileName) {
      const base64Data = mediaBase64.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");
      const filePath = `communities/${crypto.randomUUID()}-${fileName}`;

      const { error } = await supabase.storage.from("community-images").upload(filePath, buffer, {
        contentType: fileType,
        upsert: true,
      });

      if (error) throw new Error(error.message);

      const { data } = supabase.storage.from("community-images").getPublicUrl(filePath);
      updatedData.imageUrl = data.publicUrl;
    }

    // Upload new banner if provided
    if (bannerBase64 && bannerFileName) {
      const base64Data = bannerBase64.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");
      const filePath = `community-banners/${crypto.randomUUID()}-${bannerFileName}`;

      const { error } = await supabase.storage.from("community-images").upload(filePath, buffer, {
        contentType: bannerFileType,
        upsert: true,
      });

      if (error) throw new Error(error.message);

      const { data } = supabase.storage.from("community-images").getPublicUrl(filePath);
      updatedData.bannerUrl = data.publicUrl;
    }

    const updatedCommunity = await prisma.community.update({
      where: { id: communityId },
      data: updatedData,
    });

    return NextResponse.json(updatedCommunity, { status: 200 });
  } catch (error) {
    console.error("Error updating community:", error);
    return NextResponse.json({ error: "Failed to update community" }, { status: 500 });
  }
}
