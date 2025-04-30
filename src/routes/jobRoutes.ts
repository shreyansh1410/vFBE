import express from "express";
import {
  getJobs,
  getJobById,
  saveJob,
  applyToJob,
} from "../controller/jobController";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/:id/save", requireAuth(), saveJob);
router.post("/:id/apply", requireAuth(), applyToJob);

export default router;
