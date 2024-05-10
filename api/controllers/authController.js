import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

//Sign-up controller
export const signUpController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res
      .status(201)
      .send({ success: true, message: "New user created", newUser });
  } catch (error) {
    next(error);
  }
};

//Sign-in controller
export const sigInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));
    const passMatched = bcrypt.compareSync(password, user.password);
    if (!passMatched) return next(errorHandler(401, "Invalid password"));
    //creating token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //storing cookie in browser
    res.cookie("access_token", token, { httpOnly: true, expiresIn: "7d" });
    return res.status(200).send({
      success: true,
      message: "User signed in",
      user: {
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
