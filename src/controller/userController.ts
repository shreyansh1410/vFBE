import { Request, Response } from "express";
import * as userService from "../services/userService";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const clerkId = req.auth.userId;
    const user = await userService.getUserByClerkId(clerkId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
