import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
const app = express();
app.use(express.json());
dotenv.config();

//database
connectDB();
//middlewares
app.use(morgan("dev"));
//routes
app.use("/api/v1/user", userRouter);

app.use("/api/v1/auth", authRouter);

app.listen(3000, () => {
  console.log("Server is running pn port 3000".bgGreen);
});
