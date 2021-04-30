const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const Brand = require("../models/brand.model");
const Category = require("../models/category.model");
const { categoriesCollector, brandsCollector } = require("../utils/collector");

router.post("/", async (req, res) => {
  let priceLimit = req.body.priceLimit || 100000000000000;

  //filtered products
  let products = await Product.find({ price: { $lte: priceLimit } })
    .populate("categoryId")
    .populate("brandId")
    .lean()
    .exec();

  //total products
  totalProducts = products.length;

  //price range
  let min = await Product.findOne({}, { price: 1, _id: 0 }).sort({ price: 1 });
  let max = await Product.findOne({}, { price: 1, _id: 0 }).sort({ price: -1 });

  //distinct categories
  let categories = categoriesCollector(products);
  let brands = brandsCollector(products);

  return res.status(200).json({
    totalProducts,
    brands: Object.entries(brands),
    categories: Object.entries(categories),
    min: min.price,
    max: max.price,
    products,
  });
});

router.post("/filter/categories", async (req, res) => {
  let priceLimit = req.body.priceLimit || 100000000000000;
  let categoriesArray = req.body.categoriesArray;
  let products;

  //filtered products
  //brandId: { $in: brandsArray },

  products = await Product.find({
    price: { $lte: priceLimit },
    categoryId: { $in: categoriesArray },
  })
    .populate("categoryId")
    .populate("brandId")
    .lean()
    .exec();

  let brands = brandsCollector(products);
  //total products
  totalProducts = products.length;
  return res.status(200).json({
    totalProducts,
    products,
    brands: Object.entries(brands),
  });
});

router.post("/filter/brands", async (req, res) => {
  let priceLimit = req.body.priceLimit || 100000000000000;
  let brandsArray = req.body.brandsArray;
  let categoriesArray = req.body.categoriesArray;
  let products;
  console.log(categoriesArray, brandsArray);
  //filtered products

  if (categoriesArray.length !== 0 && brandsArray.length !== 0) {
    products = await Product.find({
      price: { $lte: priceLimit },
      categoryId: { $in: categoriesArray },
      brandId: { $in: brandsArray },
    })
      .populate("categoryId")
      .populate("brandId")
      .lean()
      .exec();
  } else if (categoriesArray.length === 0) {
    products = await Product.find({
      price: { $lte: priceLimit },
      brandId: { $in: brandsArray },
    })
      .populate("categoryId")
      .populate("brandId")
      .lean()
      .exec();
  } else {
    products = await Product.find({
      price: { $lte: priceLimit },
      categoryId: { $in: categoriesArray },
    })
      .populate("categoryId")
      .populate("brandId")
      .lean()
      .exec();
  }

  //total products
  totalProducts = products.length;

  return res.status(200).json({
    totalProducts,
    products,
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
