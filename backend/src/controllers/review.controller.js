const express = require("express");
const router = express.Router();
const Review = require("../models/review.model");
const Product = require("../models/product.model");

router.post("/", async (req, res) => {
  let user = req.body.userId;
  let product = req.body.productId;

  let review = await Review.find({
    productId: { $eq: product },
    userId: { $eq: user },
  })
    .populate("userId", { first_name: 1, last_name: 1, email: 1 })
    .lean()
    .exec();

  res.status(200).json({ data: review });
});

router.post("/post", async (req, res) => {
  let { userId, productId, message, rating } = req.body;
  rating = +rating;
  let review = await Review.create(req.body);

  let product = await Product.findById(productId);
  product.ratings = Math.floor((product.ratings + rating) / 2);
  let newProduct = await Product.findByIdAndUpdate(productId, product, {
    new: true,
  });
  res.status(201).json({ data: review });
});

module.exports = router;
