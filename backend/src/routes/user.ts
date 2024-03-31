import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { Account, User } from "../db";
import authMiddleware from "../middleware";

const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "nhi hoga ja",
    });
  }
  //to find the exiting one
  const existinguser = await User.findOne({
    userName: req.body.username,
  });
  if (existinguser) {
    return res.status(411).json({
      message: "already h!",
    });
  }
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;
  await Account.create({
    userId,
    balance:1+Math.random()*1000
  })

  //besi kam nai
  const token = jwt.sign({ userId }, "arise");

  return res.json({
    message: "all done!",
    token,
    Account,
  });
});

router.post("/login", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "kya likh rha h",
    });
  }
  const existinguser = await User.findOne({
    username: req.body.username,
  });
  if (!existinguser) {
    return res.status(411).json({
      message: "kaha beta ja lolipop kha",
    });
  }

  const checkCredentials = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!checkCredentials) {
    return res.status(411).json({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      userId: checkCredentials._id,
    },
    "arise"
  );

  res.json({
    token: token,
  });
  return;
});

router.put("/update", authMiddleware, async (req: any, res: any) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.userId }, req.body);
    return res.status(200).json({ message: "successfully" });
  } catch (error) {
    console.log(error);
  }
});

//This is needed so users can search for their friends and send them money
router.get("/search", async (req: any, res: any) => {
  const filter = req.query.filter || "";
  console.log(filter);

  try {
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });
    console.log(users);
    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.log(error);
  }

  //console.log(res);
});

export default router;
