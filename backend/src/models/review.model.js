const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      rel: "products",
      required: true,
    },
    userId: {
      type: String,
      rel: "users",
      required: true,
    },
    message: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewsSchema);
