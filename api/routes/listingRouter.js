import express from "express";
import { createListingController } from "../controllers/listingController.js";

const router = express.Router();

// Create Listing || POST
router.post("/create", createListingController);

export default router;
