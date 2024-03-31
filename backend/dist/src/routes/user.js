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
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const router = express_1.default.Router();
const signupBody = zod_1.default.object({
    username: zod_1.default.string().email(),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    password: zod_1.default.string(),
});
const signinBody = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "nhi hoga ja",
        });
    }
    //to find the exiting one
    const existinguser = yield db_1.User.findOne({
        userName: req.body.username,
    });
    if (existinguser) {
        return res.status(411).json({
            message: "already h!",
        });
    }
    const user = yield db_1.User.create({
        userName: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    const userID = user._id;
    //besi kam nai
    const token = jsonwebtoken_1.default.sign({ userID }, "arise");
    return res.json({
        message: "all done!",
        token,
    });
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "nhi h tum",
        });
    }
    const existinguser = yield db_1.User.findOne({
        userName: req.body.username,
    });
    if (!existinguser) {
        return res.status(411).json({
            message: "kaha beta ja lolipop kha",
        });
    }
    const checkCredentials = yield db_1.User.findOne({
        userName: req.body.username,
        password: req.body.password,
    });
    if (!checkCredentials) {
        return res.status(411).json({
            message: "invalid credentials",
        });
    }
    const token = jsonwebtoken_1.default.sign({
        userId: checkCredentials._id,
    }, "arise");
    res.json({
        token: token,
    });
    return;
}));
router.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        return res.status(200).json({});
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
