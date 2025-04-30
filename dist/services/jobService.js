"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const userService = __importStar(require("./userService"));
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
const saveJob = (clerkId, jobId) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield prisma.job.findUnique({ where: { id: jobId } });
    if (!job)
        return false;
    yield userService.ensureUserExists(clerkId);
    yield prisma.user.update({
        where: { clerkId },
        data: { savedJobs: { connect: { id: jobId } } },
    });
    return true;
});
exports.saveJob = saveJob;
const applyToJob = (clerkId, jobId) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield prisma.job.findUnique({ where: { id: jobId } });
    if (!job)
        return false;
    yield userService.ensureUserExists(clerkId);
    yield prisma.user.update({
        where: { clerkId },
        data: { appliedJobs: { connect: { id: jobId } } },
    });
    return true;
});
exports.applyToJob = applyToJob;
