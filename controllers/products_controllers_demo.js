const path = require("path");
const fs = require("fs");

const { rootDir1, rootDir2 } = require("../utilities/path");
const Product = require("../models/product");
const Cart = require("../models/cart");

const getShopPage = async (req, res) => {
  res.render("shop/shop", { pageTitle: "Shop page", activeClass: "shop" });
};

const getProductList = async (req, res) => {
  Product.fetchAll((productList) => {
    res.status(200).render("./shop/products", {
      prods: productList,
      pageTitle: "Products",
      hasProducts: productList.length > 0,
      activeClass: "products",
      activeProductsCss: true,
    });
  });
};

const getCart = async (req, res) => {
  Cart.getCart((cart) => {
    Product.fetchAll((productList) => {
      const cartProducts = new Array();
      for (const product of productList) {
        const cartProductData = cart.productList.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            quantity: cartProductData.quantity,
          });
        }
      }
      res.status(200).render("./shop/cart", {
        cartProducts: cartProducts,
        cartProductsLength: cartProducts.length > 0,
        pageTitle: "Your Cart",
        path: "/cart",
        activeClass: "cart",
        activeFormCss: true,
        activeProductsCss: true,
      });
    });
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
  Product.findById(id, (product) => {
    res.status(200).render("shop/product-detail", {
      product,
      pageTitle: "Products-details",
      activeClass: "products-details",
      activeProductsCss: true,
    });
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
