import userModel from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";
import listingModel from "./../models/listingModel.js";

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

//getAlleUserListingsController

// Controller to get all listings associated with a specific user ID
export const getAlleUserListingsController = async (req, res, next) => {
  // Check if the authenticated user ID matches the requested user ID
  if (req.user.id !== req.params.id)
    // If not authorized, return an error response
    return next(errorHandler(401, "You can only view your own listings"));

  try {
    // Query the database for all listings associated with the user ID
    const listings = await listingModel.find({ useRef: req.params.id });
    // Return the listings in the response
    return res
      .status(200)
      .send({ success: true, message: "ALl listings fetched", listings });
  } catch (error) {
    // If an error occurs during database operation, pass it to the error handling middleware
    next(error);
  }
};
