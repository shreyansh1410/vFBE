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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = exports.getUserById = exports.authenticateUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password, }) {
    const existing = yield prisma.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("Email already in use");
    const passwordHash = yield bcryptjs_1.default.hash(password, 10);
    const user = yield prisma.user.create({
        data: { name, email, passwordHash },
    });
    const token = (0, exports.generateJWT)(user.id);
    return { user, token };
});
exports.createUser = createUser;
const authenticateUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, }) {
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("Invalid credentials");
    const valid = yield bcryptjs_1.default.compare(password, user.passwordHash);
    if (!valid)
        throw new Error("Invalid credentials");
    const token = (0, exports.generateJWT)(user.id);
    return { user, token };
});
exports.authenticateUser = authenticateUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findUnique({
        where: { id },
        include: { appliedJobs: true, savedJobs: true },
    });
});
exports.getUserById = getUserById;
const generateJWT = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};
exports.generateJWT = generateJWT;
const verifyJWT = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyJWT = verifyJWT;
