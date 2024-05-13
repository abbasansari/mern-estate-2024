import listingModel from "../models/listingModel.js";

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
