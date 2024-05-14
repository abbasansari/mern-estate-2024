import express from "express";
import {
  deleteUserController,
  getAlleUserListingsController,
  updateUserController,
  userController,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", userController);

// Update User || POST
router.post("/update/:id", verifyToken, updateUserController);

// Delete User || Delete
router.delete("/delete/:id", verifyToken, deleteUserController);

// Gel All User listings || get
router.get("/listing/:id", verifyToken, getAlleUserListingsController);

export default router;
