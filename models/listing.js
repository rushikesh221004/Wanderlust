const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "https://img.freepik.com/free-vector/house-facade_23-2147512082.jpg?ga=GA1.1.907806831.1724594250&semt=ais_hybrid",
    set: (image) =>
      image === ""
        ? "https://img.freepik.com/free-vector/house-facade_23-2147512082.jpg?ga=GA1.1.907806831.1724594250&semt=ais_hybrid"
        : image,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
