// import { NextResponse } from "next/server";
// import prisma from "@/libs/prisma";
// import getCurrentUser from "@/functions/getCurrentUser";

// export async function GET() {
//   try {
//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const communities = await prisma.community.findMany({
//       where: {
//         moderatorId: user.id,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//       include:{
//         posts:true
//       }
//     });

//     return NextResponse.json(communities, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user communities:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch communities" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import getCurrentUser from "@/functions/getCurrentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // communities the user CREATED (moderator)
    const createdCommunities = await prisma.community.findMany({
      where: {
        moderatorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        posts: {
          include: {
            community: true,
          },
        },
      },
    });

    // communities the user JOINED
    const joinedCommunities = await prisma.communityMember?.findMany({
      where: {
        userId: user.id,
      },
      include: {
        community: {
          include: {
            posts: {
              include: {
                community: true,
              },
            },
          },
        },
      },
      orderBy: {
        joinedAt: "desc",
      },
    });

    return NextResponse.json(
      {
        createdCommunities,
        joinedCommunities: joinedCommunities?.map(j => j.community),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user communities:", error);
    return NextResponse.json(
      { error: "Failed to fetch communities" },
      { status: 500 }
    );
  }
}
