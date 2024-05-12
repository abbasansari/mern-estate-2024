import express from "express";
import {
  sigInController,
  signUpController,
  googleController,
  signOutController,
} from "../controllers/authController.js";

const router = express.Router();
//Sign-up route || POST
router.post("/sign-up", signUpController);
//Sign-in route || POST
router.post("/sign-in", sigInController);
//Google Sign-in route || POST
router.post("/google", googleController);
// Sign-out route || GET
router.get("/sign-out", signOutController);
export default router;
