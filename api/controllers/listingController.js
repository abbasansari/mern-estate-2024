import listingModel from "../models/listingModel.js";
import { errorHandler } from "./../utils/errorHandler.js";

//createListingController
export const createListingController = async (req, res, next) => {
  try {
    const listing = await listingModel.create(req.body);
    res
      .status(201)
      .send({ success: true, message: "New listing created", listing });
  } catch (error) {
    next(error);
  }
};

//deleteListingController
// export const deleteListingController = async (req, res, next) => {
//   const listing = await listingModel.findById(req.params.id);

//   if (!listing) {
//     return next(errorHandler(404, "Listing not found!"));
//   }
//   console.log("req.user.id", req.user.id);
//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(401, "You can only delete your own listings!"));
//   }

//   try {
//     await listingModel.findByIdAndDelete(req.params.id);
//     res.status(200).json("Listing has been deleted!");
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteListingController = async (req, res, next) => {
  console.log(req.params.id);
  try {
    // Find the listing by ID
    const listing = await listingModel.findById(req.params.id);

    // If no listing is found, return a 404 error
    if (!listing) {
      return next(errorHandler(404, "No listing found"));
    }
    console.log("listing.userRef", listing.userRef);
    // Check if the authenticated user is authorized to delete the listing
    if (req.user.id !== listing.userRef) {
      // If not authorized, return a 403 error
      return next(errorHandler(403, "Unauthorized to delete this listing"));
    }

    // If authorized, delete the listing from the database
    await listingModel.findByIdAndDelete(req.params.id);

    // Send a success response indicating that the listing was deleted
    res.status(200).send({
      success: true,
      message: "Listing deleted",
    });
  } catch (error) {
    next(error);
  }
};

//UpdateListingController

// Controller function to update a listing
export const updateListingController = async (req, res, next) => {
  // Fetch the listing by ID from the database
  const initialListing = await listingModel.findById(req.params.id);

  // If listing not found, return a 404 error
  if (!initialListing) {
    return next(errorHandler(404, "Listing not found"));
  }

  // Check if the current user is the owner of the listing
  if (req.user.id !== initialListing.userRef) {
    return next(errorHandler(404, "You can update your own listing only"));
  }

  try {
    // Update the listing in the database with the provided data
    const updatedListing = await listingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Send a success response with the updated listing
    res.status(200).send({
      success: true,
      message: "Listing updated",
      listing: updatedListing,
    });
  } catch (error) {
    // If an error occurs during the update process, pass it to the error handling middleware
    next(error);
  }
};

// getSingleListingController

export const getSingleListingController = async (req, res, next) => {
  try {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) return next(errorHandler(401, "No listing found"));
    res
      .status(200)
      .send({ success: true, message: "Single Listing fethced", listing });
  } catch (error) {
    next(error);
  }
};

//getSearchListingController Search

export const getSearchListingController = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    //sortig result on offer basees
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    //sortig result on furnished basees
    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    //sortig result on parking basees
    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await listingModel
      .find({
        //hm search name ki base pr krhy h description pr b krskty , $regex means kuch b arha h eg me agr ksi b name mein me h wh dekhao or
        //$options: i ka mtlb h k uppercase lowercase ko ignore or kam pr focus kro
        //or name ki term pr search kro or usmein offer frunish parking type ko zhnd mein rkhy hwy
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).send(listings);
  } catch (error) {
    next(error);
  }
};
