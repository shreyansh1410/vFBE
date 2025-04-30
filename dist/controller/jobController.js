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
exports.applyToJob = exports.saveJob = exports.getJobById = exports.getJobs = void 0;
const jobService = __importStar(require("../services/jobService"));
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = {
            search: req.query.search,
            location: req.query.location,
            salaryMin: parseInt(req.query.salaryMin) || undefined,
            salaryMax: parseInt(req.query.salaryMax) || undefined,
            job_type: req.query.job_type,
            experience_level: req.query.experience_level,
            work_setting: req.query.work_setting,
            h1Type: req.query.h1Type,
            job_category: req.query.job_category,
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        };
        const jobs = yield jobService.getAllJobs(filters);
        return res.status(200).json(jobs);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getJobs = getJobs;
const getJobById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield jobService.getJobById(parseInt(req.params.id));
        if (!job)
            return res.status(404).json({ message: "Job not found" });
        return res.status(200).json(job);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getJobById = getJobById;
const saveJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clerkId = req.auth.userId;
        const success = yield jobService.saveJob(clerkId, parseInt(req.params.id));
        if (!success)
            return res.status(404).json({ message: "Job not found" });
        return res.status(200).json({ message: "Job saved" });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.saveJob = saveJob;
const applyToJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clerkId = req.auth.userId;
        const success = yield jobService.applyToJob(clerkId, parseInt(req.params.id));
        if (!success)
            return res.status(404).json({ message: "Job not found" });
        return res.status(200).json({ message: "Applied to job" });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.applyToJob = applyToJob;
