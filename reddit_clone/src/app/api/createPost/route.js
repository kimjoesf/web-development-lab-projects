import getCurrentUser from "@/functions/getCurrentUser";
import prisma from "@/libs/prisma";
import supabase from "@/libs/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, body, communityId, media } = await req.json();
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const mediaURLs = [];
        const mediaTypes = [];
        if (media?.length) {
            for (const item of media) {
                const base64Data = item.mediaBase64.split(",")[1];
                const buffer = Buffer.from(base64Data, "base64");
                const filePath = `posts/${crypto.randomUUID()}-${item.fileName}`;

                await supabase.storage
                    .from("post-media")
                    .upload(filePath, buffer, { contentType: item.fileType });

                const { data } = supabase.storage
                    .from("post-media")
                    .getPublicUrl(filePath);

                mediaURLs.push(data.publicUrl);
                mediaTypes.push(item.mediaType);
            }
        }

        // When creating the post, only include these fields if arrays are not empty
        const data = {
            title,
            body,
            communityId,
            authorId: user.id,
        };

        if (mediaURLs.length) data.mediaURLs = mediaURLs;
        if (mediaTypes.length) data.mediaTypes = mediaTypes;

        const post = await prisma.post.create({
            data,
            include: {
                author: true,
                community: true,
            },
        });

        return NextResponse.json(post);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}
