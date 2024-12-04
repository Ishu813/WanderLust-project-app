const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "new listing created");
  console.log("New Listing was added");
  res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(
    id,
    { ...req.body },
    {
      runValidators: true,
      new: true,
    }
  );
  res.redirect(`/listings/${id}`);
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleted");
  console.log(deletedListing);
  res.redirect("/listings");
};

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "review created");
  console.log("Review was added");
  res.redirect(`/listings/${id}`);
};
