const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const Brand = require("../models/brand.model");
const Category = require("../models/category.model");

router.get("/", async (req, res) => {
  let products = await Product.find({})
    .populate("categoryId")
    .populate("brandId")
    .lean()
    .exec();

  let totalProducts = products.length;
  let min = await Product.findOne({}).sort({ price: 1 });
  let max = await Product.findOne({}).sort({ price: -1 });
  let categoryObj = {};
  let brandObj = {};
  products.map((item) => {
    categoryObj[item.categoryId.name] = 1;
    brandObj[item.brandId.name] = 1;
  });
  let categories = Object.keys(categoryObj);
  let brands = Object.keys(brandObj);
  return res.status(200).json({
    categories,
    brands,
    totalProducts,
    minPrice: min.price,
    maxPrice: max.price,
    data: products,
  });
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
