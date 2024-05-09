import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
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
