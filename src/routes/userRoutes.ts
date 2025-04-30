import express from "express";
import { getUserProfile } from "../controller/userController";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/me", requireAuth(), getUserProfile);

export default router;
