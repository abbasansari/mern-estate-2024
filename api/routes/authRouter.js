import express from "express";
import {
  sigInController,
  signUpController,
  googleController,
} from "../controllers/authController.js";

const router = express.Router();
//Sign-up route || POST
router.post("/sign-up", signUpController);
//Sign-in route || POST
router.post("/sign-in", sigInController);
//Google Sign-in route || POST
router.post("/google", googleController);
export default router;
