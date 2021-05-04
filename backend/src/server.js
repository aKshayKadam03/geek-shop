const express = require("express");
const app = express();
const connect = require("./config/db");
const cors = require("cors");

const productsRouter = require("./controllers/product.controller");
const categoryRouter = require("./controllers/category.controller");
const brandRouter = require("./controllers/brand.controller");
const reviewRouter = require("./controllers/review.controller");
const authRouter = require("./controllers/auth.controller");

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);
app.use("/reviews", reviewRouter);
app.use("/auth", authRouter);

async function start() {
  await connect();
  app.listen(8000, () => {
    console.log("Listening on port 8000");
  });
}

module.exports = start;
