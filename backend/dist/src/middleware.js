"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
JWT_SECRET: 'arise';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    // Bearer jfskdjfs
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'arise');
        console.log(decoded);
        next();
    }
    catch (error) {
        return res.status(403);
    }
};
exports.default = authMiddleware;
