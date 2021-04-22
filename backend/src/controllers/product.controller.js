const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const client = require("../config/redis");

router.get("/", async (req, res) => {
  let products = await Product.find({}).lean().exec();
  let totalProducts = await Product.find({}).countDocuments().lean().exec();
  let categories = await Product.distinct("category");
  let brands = await Product.distinct("brand");
  return res
    .status(200)
    .json({ totalProducts, brands, categories, data: products });
});

router.get("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id).lean().exec();
  return res.status(200).json({ data: product });
});

router.post("/create", async (req, res) => {
  let product = await Product.create(req.body);
  return res.status(201).json({ data: product });
});

router.patch("/update/:id", async (req, res) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(202).send({ data: product });
});

router.delete("/delete/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.status(204).send();
});

module.exports = router;

//redis caching

// client.get("allProducts", async function (err, response) {
//   if (err) return res.status(500).json({ message: "Something went wrong" });
//   if (response) {
//     return res.status(200).json({ data: JSON.parse(response) });
//   } else {
//     let products = await Product.find({}).lean().exec();
//     client.set("allProducts", JSON.stringify(products));
//     return res.status(200).json({ data: products });
//   }
// });
