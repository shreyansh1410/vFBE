import { Request, Response } from "express";
import * as jobService from "../services/jobService";

export const getJobs = async (req: Request, res: Response): Promise<any> => {
  try {
    const filters = {
      search: req.query.search as string,
      location: req.query.location as string,
      salaryMin: parseInt(req.query.salaryMin as string) || undefined,
      salaryMax: parseInt(req.query.salaryMax as string) || undefined,
      job_type: req.query.job_type as string,
      experience_level: req.query.experience_level as string,
      work_setting: req.query.work_setting as string,
      h1Type: req.query.h1Type as string,
      job_category: req.query.job_category as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };
    const jobs = await jobService.getAllJobs(filters);
    return res.status(200).json(jobs);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<any> => {
  try {
    const job = await jobService.getJobById(parseInt(req.params.id));
    if (!job) return res.status(404).json({ message: "Job not found" });
    return res.status(200).json(job);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const saveJob = async (req: Request, res: Response): Promise<any> => {
  try {
    const clerkId = req.auth.userId;
    const success = await jobService.saveJob(clerkId, parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "Job not found" });
    return res.status(200).json({ message: "Job saved" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const applyToJob = async (req: Request, res: Response): Promise<any> => {
  try {
    const clerkId = req.auth.userId;
    const success = await jobService.applyToJob(
      clerkId,
      parseInt(req.params.id)
    );
    if (!success) return res.status(404).json({ message: "Job not found" });
    return res.status(200).json({ message: "Applied to job" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
