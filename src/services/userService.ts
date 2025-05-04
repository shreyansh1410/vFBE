import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });
  const token = generateJWT(user.id);
  return { user, token };
};

export const authenticateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");
  if (!user.passwordHash) {
    throw new Error(
      "This account uses Google sign-in. Please sign in with Google."
    );
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");
  const token = generateJWT(user.id);
  return { user, token };
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    include: { appliedJobs: true, savedJobs: true },
  });
};

export const generateJWT = (userId: number) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { id: number };
};

export const findOrCreateGoogleUser = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: { name, email },
    });
  }
  const token = generateJWT(user.id);
  return { user, token };
};
