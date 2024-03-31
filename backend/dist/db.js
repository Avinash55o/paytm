"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Account = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SCHEMA = new mongoose_1.default.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
});
const BankSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
exports.Account = mongoose_1.default.model("Account", BankSchema);
exports.User = mongoose_1.default.model("user", SCHEMA);
