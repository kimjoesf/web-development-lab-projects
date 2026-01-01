import prisma from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs/server";
 

const getCurrentUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const userId = clerkUser.id;

  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        username: clerkUser.username || "NewUser",
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        imageUrl: clerkUser.imageUrl || "",
      },
    });
  }

  return user;
};

export default getCurrentUser;
