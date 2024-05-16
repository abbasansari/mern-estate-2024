import express from "express";
import {
  createListingController,
  deleteListingController,
  getSearchListingController,
  getSingleListingController,
  updateListingController,
} from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Create Listing || POST
router.post("/create", createListingController);
// Delete Listing || Delete
router.delete("/delete/:id", verifyToken, deleteListingController);
// Update Listing || POST
router.post("/update/:id", verifyToken, updateListingController);
// Get Single Listing || GET
router.get("/getsinglelisting/:id", getSingleListingController);

// Get Search || GET
router.get("/get", getSearchListingController);

export default router;
