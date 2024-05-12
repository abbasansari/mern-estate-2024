import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
dotenv.config();

//database
connectDB();
//middlewares
app.use(morgan("dev"));
app.use(cookieParser());
//routes
app.use("/api/v1/user", userRouter);
//authentication rutes
app.use("/api/v1/auth", authRouter);

//Error Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Corrected variable name and syntax
  const message = err.message || "Internal Server Error"; // Corrected variable name

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running pn port 3000".bgGreen);
});
