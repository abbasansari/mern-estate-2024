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
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

///////////googleController

// export const googleController = async (req, res, next) => {
//   try {
//     //verification of usr existance
//     const user = await userModel.findOne({ email: req.body.email });
//     // if(user) return next(errorHandler(409,"User already exist"))
//     //creating token
//     console.log("userModel.findOne", user);
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       //storing cookie in browser
//       res.cookie("access_token", token, { httpOnly: true, expiresIn: "7d" });
//       return res.status(200).send({
//         success: true,
//         message: "User signed in",
//         user: {
//           id: user._id,
//           username: user.username,
//           email: user.email,
//         },
//         token,
//       });
//     } else {
//       //as we are accepting pass in db we need to generate a random one for google signin
//       //below line random pass bnaye gi 36 chars ki eg 0.89765432 slice 0. k bad wali string uthaye ga
//       // or agr 16 char ka banana pass t0 + same function
//       const generatedPass = Math.random().toString(36).slice(-8);
//       const hashedPass = bcrypt.hashSync(generatedPass, 10);

//       //creatig new user jsy k nam abbas ali aye to hmien chahye abbasali123 iskylye name k sth function
//       const newUser = new userModel({
//         username:
//           req.body.username.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPass,
//         picture: req.body.photo,
//       });
//       //saving newUser
//       await newUser.save();
//       console.log(newUser);
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       //storing cookie in browser
//       res.cookie("access_token", token, { httpOnly: true, expiresIn: "7d" });
//       return res.status(200).send({
//         success: true,
//         message: "User signed in",
//         newUser: {
//           id: user._id,
//           username: user.username,
//           email: user.email,
//         },
//         token,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const googleController = async (req, res, next) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = user._doc;
//       res.cookie("access_token", token, { httpOnly: true });
//       return res.status(200).send({
//         success: true,
//         message: "User signed in",
//         user: {
//           id: user._id,
//           username: user.username,
//           email: user.email,
//         },
//         token,
//       });
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
//       const newUser = new userModel({
//         username:
//           req.body.username.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         picture: req.body.photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       // const { password: pass, ...rest } = newUser._doc;
//       res.cookie("access_token", token, { httpOnly: true });
//       return res.status(200).send({
//         success: true,
//         message: "User signed in",
//         newUser: {
//           id: newUser._id,
//           username: newUser.username,
//           email: newUser.email,
//         },
//         token,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const googleController = async (req, res, next) => {
  try {
    // Verification of user existence
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      // User already exists, generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // Store token in a cookie
      res.cookie("access_token", token, { httpOnly: true, expiresIn: "7d" });

      return res.status(200).send({
        success: true,
        message: "User signed in",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.picture,
        },
        token,
      });
    } else {
      // Generate a random password for Google sign-in
      const generatedPass = Math.random().toString(36).slice(-8);
      const hashedPass = bcrypt.hashSync(generatedPass, 10);

      // Create a new user
      const newUser = new userModel({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPass,
        picture: req.body.photo,
      });

      // Save the new user
      await newUser.save();

      // Generate token for the new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      // Store token in a cookie
      res.cookie("access_token", token, { httpOnly: true, expiresIn: "7d" });

      return res.status(200).send({
        success: true,
        message: "User signed in",
        newUser: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.picture,
        },
        token,
      });
    }
  } catch (error) {
    // Handle errors
    next(error);
  }
};

// signOutController

export const signOutController = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).send({
      success: true,
      message: "User signed out",
    });
  } catch (error) {
    next(error);
  }
};
