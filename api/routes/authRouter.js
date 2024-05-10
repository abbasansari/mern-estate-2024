import express from "express";
import {
  sigInController,
  signUpController,
} from "../controllers/authController.js";

const router = express.Router();
//Sign-up route || POST
router.post("/sign-up", signUpController);
//Sign-in route || POST
router.post("/sign-in", sigInController);
export default router;
