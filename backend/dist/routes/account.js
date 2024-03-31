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
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../middleware"));
const db_1 = require("../db");
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.get("/balance", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield db_1.Account.findOne({
            userId: req.userId
        });
        res.json({ balance: account === null || account === void 0 ? void 0 : account.balance });
    }
    catch (error) {
        console.log(error);
    }
}));
router.post("/transfer", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const account = yield db_1.Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
        yield session.abortTransaction();
        return res.status(400).json({ message: "insufficient balence" });
    }
    const toAccount = yield db_1.Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        yield session.abortTransaction();
        return res.status(400).json({ message: "invalid account" });
    }
    ;
    // Perform the transfer
    yield db_1.Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    yield db_1.Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    //commit the transection
    yield session.commitTransaction();
    res.json({
        massage: "paisa gaya"
    });
}));
// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })
// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })
exports.default = router;
