import { Request, Response } from "express";
import * as userService from "../services/userService";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await userService.createUser({
      name,
      email,
      password,
    });
    return res.status(201).json({ token });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const signIn = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.authenticateUser({
      email,
      password,
    });
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  return res.status(200).json({ message: "Logged out" });
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // req.user is set by JWT middleware
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const user = await userService.getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const googleAuth = async (req: Request, res: Response): Promise<any> => {
  try {
    const { credential } = req.body;
    if (!credential)
      return res.status(400).json({ message: "No credential provided" });
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.name) {
      return res.status(400).json({ message: "Invalid Google token" });
    }
    const { user, token } = await userService.findOrCreateGoogleUser({
      email: payload.email,
      name: payload.name,
    });
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
