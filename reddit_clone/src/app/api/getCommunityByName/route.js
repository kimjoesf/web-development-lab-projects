import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const communityName = searchParams.get("communityName");

        if (!communityName) {
            return NextResponse.json(
                { error: "Community name is required" },
                { status: 400 }
            );
        }

        const community = await prisma.community.findUnique({
            where: { name: communityName },
            include: {
                posts: {
                    include: {
                        community: true,
                    },
                },
            },
        });

        if (!community) {
            return NextResponse.json(
                { error: "Community not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(community, { status: 200 });
    } catch (error) {
        console.error("Error fetching community:", error);
        return NextResponse.json(
            { error: "Failed to fetch community" },
            { status: 500 }
        );
    }
}
