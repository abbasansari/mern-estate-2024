import express from "express";
import {
  createListingController,
  deleteListingController,
} from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Create Listing || POST
router.post("/create", createListingController);
// Delete Listing || Delete
router.delete("/delete/:id", verifyToken, deleteListingController);
// Update Listing || POST
router.post("/update/:id", verifyToken, deleteListingController);

export default router;
