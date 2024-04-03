const path = require("path");
const fs = require("fs");

const { rootDir1, rootDir2 } = require("../utilities/path");
const Product = require("../models/product");
const Cart = require("../models/cart");
const { error } = require("console");

const getShopPage = async (req, res) => {
  res.render("shop/shop", { pageTitle: "Shop page", activeClass: "shop" });
};

const getProductList = async (req, res) => {
  Product.findAll()
    .then((products) => {
      res.status(200).render("./shop/products", {
        prods: products,
        pageTitle: "Products",
        hasProducts: products.length > 0,
        activeClass: "products",
        activeProductsCss: true,
      });
    })
    .catch((err) => console.log(err));
};

const getCart = async (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.status(200).render("./shop/cart", {
            cartProducts: products,
            cartProductsLength: products.length > 0,
            pageTitle: "Your Cart",
            path: "/cart",
            activeClass: "cart",
            activeFormCss: true,
            activeProductsCss: true,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).send(`Error: ${err.message}`);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Error: ${err.message}`);
    });
};

const getOders = async (req, res) => {
  res.status(200).render("./shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
    activeClass: "orders",
  });
};

const getCheckOut = async (req, res) => {
  res.status(200).render("shop/check-out", {
    pageTitle: "Your Check Out",
    path: "/check-out",
  });
};

const getProductDetail = async (req, res) => {
  const id = req.params.id;
  Product.findAll({ where: { id: id } })
    .then((product) => {
      res.status(200).render("shop/product-detail", {
        product: product.at(0),
        pageTitle: product.at(0).productName,
        activeClass: "products-details",
        activeProductsCss: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addToCart = async (req, res) => {
  const { productId, productPrice } = req.body;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, productPrice);
  });
  res.status(201).redirect("/api/v1/shop/cart");
};

const deleteProduct = async (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/api/v1/shop/cart");
  });
};

module.exports = {
  getShopPage,
  getProductList,
  getCart,
  getOders,
  getCheckOut,
  getProductDetail,
  addToCart,
  deleteProduct,
};
