import express from "express";
import mongoose from "mongoose";
import apiRouter from "./api";
import userRouter from "./routes/user";
import accountRouter from "./routes/account";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(apiRouter);
app.use(userRouter);
app.use(accountRouter);

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("ho gaya"))
  .then(() => app.listen(3000, () => console.log("connect ho gai 3000 port me")));
