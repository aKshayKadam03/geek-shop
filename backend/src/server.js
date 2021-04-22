const express = require("express");
const app = express();
const connect = require("./config/db");

const productsRouter = require("./controllers/product.controller");
app.use(express.json());
app.use("/products", productsRouter);

async function start() {
  await connect();
  app.listen(8000, () => {
    console.log("Listening on port 8000");
  });
}

module.exports = start;
