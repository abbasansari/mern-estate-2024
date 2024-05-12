import userModel from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";

export const userController = (req, res) => {
  try {
    res.send({ success: true, message: "Welcome kuttay" });
  } catch (error) {
    console.log(error);
  }
};

//updateUserController
export const updateUserController = async (req, res, next) => {
  // Check if the user is authorized to update the profile
  // console.log(req.user.id, "req.params.id", req.params.id);
  if (req.user.id !== req.params.id)
    return res.status(401).send({
      success: false,
      statuscode: 401,
      message: "You can update your account only",
    });

  try {
    // Hash the password if provided
    if (req.body.password)
      req.body.password = bcrypt.hashSync(req.body.password, 10);

    // Find and update the user profile
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          picture: req.body.avatar,
        },
      },
      { new: true } // Return the updated user object
    );

    // Send success response with updated user details
    return res.status(200).send({
      success: true,
      message: "Profile Updated",
      newUser: {
        username: user.username,
        email: user.email,
        avatar: user.picture,
        id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

//deleteUserController

export const deleteUserController = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    return res.status(200).send({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};
