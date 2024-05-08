import express from "express";
import colors from "colors";
import morgan from "morgan";
const app = express();

//middlewares
app.use(morgan("dev"));
app.listen(3000, () => {
  console.log("Server is running pn port 3000".bgGreen);
});
