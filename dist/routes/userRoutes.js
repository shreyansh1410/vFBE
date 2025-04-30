"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const express_2 = require("@clerk/express");
const router = express_1.default.Router();
router.get("/me", (0, express_2.requireAuth)(), userController_1.getUserProfile);
exports.default = router;
