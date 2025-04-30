import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface JobFilters {
  search?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  job_type?: string;
  experience_level?: string;
  work_setting?: string;
  h1Type?: string;
  job_category?: string;
  page: number;
  limit: number;
}

export const getAllJobs = async (filters: JobFilters) => {
  const {
    search,
    location,
    salaryMin,
    salaryMax,
    job_type,
    experience_level,
    work_setting,
    h1Type,
    job_category,
    page,
    limit,
  } = filters;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (search) {
    where.OR = [
      { job_title: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
    ];
  }
  if (location)
    where.job_location = { contains: location, mode: "insensitive" };
  if (salaryMin) where.salary = { gte: salaryMin };
  if (salaryMax) where.salary = { lte: salaryMax };
  if (job_type) where.job_type = job_type;
  if (experience_level) where.experience_level = experience_level;
  if (work_setting) where.work_setting = work_setting;
  if (h1Type) where.h1Type = h1Type;
  if (job_category) where.job_category = job_category;

  return prisma.job.findMany({
    where,
    skip,
    take: limit,
    orderBy: { date_posted: "desc" },
  });
};

export const getJobById = async (id: number) => {
  return prisma.job.findUnique({
    where: { id },
    include: {
      applicants: { select: { id: true, name: true } },
      savers: { select: { id: true, name: true } },
    },
  });
};

export const saveJob = async (userId: number, jobId: number) => {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return false;
  await prisma.user.update({
    where: { id: userId },
    data: { savedJobs: { connect: { id: jobId } } },
  });
  return true;
};

export const applyToJob = async (userId: number, jobId: number) => {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return false;
  await prisma.user.update({
    where: { id: userId },
    data: { appliedJobs: { connect: { id: jobId } } },
  });
  return true;
};
