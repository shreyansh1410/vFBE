"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyToJob = exports.saveJob = exports.getJobById = exports.getAllJobs = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllJobs = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, location, salaryMin, salaryMax, job_type, experience_level, work_setting, h1Type, job_category, page, limit, } = filters;
    const skip = (page - 1) * limit;
    const where = {};
    if (search) {
        where.OR = [
            { job_title: { contains: search, mode: "insensitive" } },
            { company: { contains: search, mode: "insensitive" } },
        ];
    }
    if (location)
        where.job_location = { contains: location, mode: "insensitive" };
    if (salaryMin)
        where.salary = { gte: salaryMin };
    if (salaryMax)
        where.salary = { lte: salaryMax };
    if (job_type)
        where.job_type = job_type;
    if (experience_level)
        where.experience_level = experience_level;
    if (work_setting)
        where.work_setting = work_setting;
    if (h1Type)
        where.h1Type = h1Type;
    if (job_category)
        where.job_category = job_category;
    return prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date_posted: "desc" },
    });
});
exports.getAllJobs = getAllJobs;
const getJobById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.job.findUnique({
        where: { id },
        include: {
            applicants: { select: { id: true, name: true } },
            savers: { select: { id: true, name: true } },
        },
    });
});
exports.getJobById = getJobById;
const saveJob = (userId, jobId) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield prisma.job.findUnique({ where: { id: jobId } });
    if (!job)
        return false;
    yield prisma.user.update({
        where: { id: userId },
        data: { savedJobs: { connect: { id: jobId } } },
    });
    return true;
});
exports.saveJob = saveJob;
const applyToJob = (userId, jobId) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield prisma.job.findUnique({ where: { id: jobId } });
    if (!job)
        return false;
    yield prisma.user.update({
        where: { id: userId },
        data: { appliedJobs: { connect: { id: jobId } } },
    });
    return true;
});
exports.applyToJob = applyToJob;
