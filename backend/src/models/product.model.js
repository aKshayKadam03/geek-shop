const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_img: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [{ type: String }],
    ratings: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
