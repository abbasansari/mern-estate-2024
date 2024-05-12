import express from "express";
import {
  updateUserController,
  userController,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", userController);

// Update User || POST
router.post("/update/:id", verifyToken, updateUserController);

export default router;
