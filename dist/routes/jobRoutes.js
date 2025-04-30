"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController_1 = require("../controller/jobController");
const requireAuth_1 = require("../middleware/requireAuth");
const router = express_1.default.Router();
router.get("/", jobController_1.getJobs);
router.get("/:id", jobController_1.getJobById);
router.post("/:id/save", requireAuth_1.requireAuth, jobController_1.saveJob);
router.post("/:id/apply", requireAuth_1.requireAuth, jobController_1.applyToJob);
exports.default = router;
