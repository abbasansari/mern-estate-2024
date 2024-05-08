import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const app = express();
dotenv.config();

//database
connectDB();
//middlewares
app.use(morgan("dev"));
app.listen(3000, () => {
  console.log("Server is running pn port 3000".bgGreen);
});
