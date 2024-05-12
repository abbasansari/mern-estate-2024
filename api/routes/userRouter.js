import express from "express";
import {
  deleteUserController,
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

export default router;
