import { PrismaClient } from "@prisma/client";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const prisma = new PrismaClient();

export const ensureUserExists = async (clerkId: string) => {
  let user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) {
    const clerkUser = { email: `user_${clerkId}@example.com`, name: "User" };
    user = await prisma.user.create({
      data: {
        clerkId,
        email: clerkUser.email,
        name: clerkUser.name,
      },
    });
  }
  return user;
};

export const getUserByClerkId = async (clerkId: string) => {
  await ensureUserExists(clerkId);
  return prisma.user.findUnique({
    where: { clerkId },
    include: { appliedJobs: true, savedJobs: true },
  });
};
