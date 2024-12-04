const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const listingController = require("../controllers/listings");

//index route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

//show Route
router.get("/:id", wrapAsync(listingController.renderNewForm));

//create route
router.post("/", wrapAsync(listingController.createListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//update route
router.patch(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.updateListing)
);

//delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
