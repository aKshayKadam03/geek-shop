const express = require("express");
const app = express();
const connect = require("./config/db");
const cors = require("cors");

const productsRouter = require("./controllers/product.controller");
app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);

async function start() {
  await connect();
  app.listen(8000, () => {
    console.log("Listening on port 8000");
  });
}

module.exports = start;
