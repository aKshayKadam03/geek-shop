const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const Brand = require("../models/brand.model");
const Category = require("../models/category.model");

router.post("/", async (req, res) => {
  let priceLimit = req.body.priceLimit || 100000000000000;
  let incomingBrands = req.body.brands;
  let incomingCategories = req.body.categories;

  //for products display
  let displayProducts = await Product.find({ price: { $lte: priceLimit } })
    .populate("categoryId")
    .populate("brandId")
    .lean()
    .exec();

  //for filter section
  let products = await Product.find({ price: { $lte: priceLimit } })
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
    if (!categoryObj[item.categoryId.name]) {
      categoryObj[item.categoryId.name] = 1;
    } else {
      categoryObj[item.categoryId.name] = categoryObj[item.categoryId.name] + 1;
    }

    if (!brandObj[item.brandId.name]) {
      brandObj[item.brandId.name] = 1;
    } else {
      brandObj[item.brandId.name] = brandObj[item.brandId.name] + 1;
    }
  });
  let categories = Object.keys(categoryObj);
  let categoriesCount = Object.values(categoryObj);
  let brands = Object.keys(brandObj);
  let brandsCount = Object.values(brandObj);

  return res.status(200).json({
    brands,
    brandsCount,
    categories,
    categoriesCount,
    totalProducts,
    min: min.price,
    max: max.price,
    data: displayProducts,
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
