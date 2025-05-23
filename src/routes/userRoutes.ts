import express from "express";
import {
  getUserProfile,
  signUp,
  signIn,
  logout,
  googleAuth,
} from "../controller/userController";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, getUserProfile);
router.post("/google", googleAuth);

export default router;
