const path = require("path");

const express = require("express");

const { rootDir1, rootDir2 } = require("../utilities/path");
const {
  getShopPage,
  getProductList,
  getCart,
  getOders,
  getCheckOut,
  getProductDetail,
  addToCart,
  deleteProduct,
} = require("../controllers/products_controllers");

const shopRouter = express.Router();

shopRouter.get("/", getShopPage);
shopRouter.get("/products", getProductList);
shopRouter.get("/products/:id", getProductDetail);
shopRouter.get("/cart", getCart);
shopRouter.post("/add-to-cart", addToCart);
shopRouter.post("/cart-delete-item", deleteProduct);
shopRouter.get("/orders", getOders);
shopRouter.get("/checkout", getCheckOut);
shopRouter.delete("/delete/:id");

module.exports = { shopRouter };